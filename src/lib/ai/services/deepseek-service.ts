import { eq, sql } from 'drizzle-orm';
import { getDb } from '../db';
import { countryAiConfig, deepseekRequests } from '../db/schema';
import { logAiEvent } from '../logger';
import { waitForRateLimit } from './rate-limiter';
import type { DeepSeekUsage } from '../types';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface DeepSeekCallOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  jsonMode?: boolean;
  agentCode?: string;
  countryCode?: string;
  maxRetries?: number;
}

export interface DeepSeekCallResult {
  content: string;
  usage: DeepSeekUsage;
  model: string;
  requestId: number;
  latencyMs: number;
}

export class DeepSeekService {
  private static instance: DeepSeekService | null = null;

  static getInstance(): DeepSeekService {
    if (!DeepSeekService.instance) {
      DeepSeekService.instance = new DeepSeekService();
    }
    return DeepSeekService.instance;
  }

  getModel(): string {
    return process.env.DEEPSEEK_MODEL ?? 'deepseek-chat';
  }

  private getApiKey(): string {
    const key = process.env.DEEPSEEK_API_KEY;
    if (!key) {
      throw new DeepSeekError('DEEPSEEK_API_KEY não configurada no .env', 'MISSING_API_KEY');
    }
    return key;
  }

  async chat(messages: ChatMessage[], options: DeepSeekCallOptions = {}): Promise<DeepSeekCallResult> {
    const maxRetries = options.maxRetries ?? 3;
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        return await this.executeRequest(messages, options);
      } catch (error) {
        lastError = error instanceof Error ? error : new Error(String(error));
        const isRetryable =
          error instanceof DeepSeekError &&
          ['RATE_LIMIT', 'SERVER_ERROR', 'NETWORK_ERROR'].includes(error.code);

        if (!isRetryable || attempt === maxRetries) break;

        const delay = Math.min(1000 * 2 ** (attempt - 1), 10_000);
        logAiEvent(options.agentCode ?? 'deepseek', `Retry ${attempt}/${maxRetries} em ${delay}ms`, {
          countryCode: options.countryCode,
          level: 'warn',
          metadata: { error: lastError.message },
        });
        await new Promise((r) => setTimeout(r, delay));
      }
    }

    throw lastError ?? new Error('DeepSeek request failed');
  }

  private async executeRequest(
    messages: ChatMessage[],
    options: DeepSeekCallOptions
  ): Promise<DeepSeekCallResult> {
    await waitForRateLimit();

    const model = options.model ?? this.getModel();
    const startTime = Date.now();
    const requestId = this.logRequestStart(messages, model, options);

    try {
      const body: Record<string, unknown> = {
        model,
        messages,
        temperature: options.temperature ?? 0.3,
        max_tokens: options.maxTokens ?? 4096,
      };

      if (options.jsonMode) {
        body.response_format = { type: 'json_object' };
      }

      const response = await fetch(DEEPSEEK_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${this.getApiKey()}`,
        },
        body: JSON.stringify(body),
        signal: AbortSignal.timeout(120_000),
      });

      const latencyMs = Date.now() - startTime;

      if (response.status === 429) {
        this.logRequestEnd(requestId, 'failed', null, latencyMs, 'Rate limit exceeded');
        throw new DeepSeekError('Rate limit da API DeepSeek atingido', 'RATE_LIMIT', 429);
      }

      if (response.status >= 500) {
        const errorText = await response.text();
        this.logRequestEnd(requestId, 'failed', null, latencyMs, errorText);
        throw new DeepSeekError(`Erro do servidor DeepSeek (${response.status})`, 'SERVER_ERROR', response.status);
      }

      if (!response.ok) {
        const errorText = await response.text();
        this.logRequestEnd(requestId, 'failed', null, latencyMs, errorText);
        throw new DeepSeekError(`DeepSeek API error (${response.status}): ${errorText}`, 'API_ERROR', response.status);
      }

      const data = await response.json();
      const content = data.choices?.[0]?.message?.content ?? '';
      const usage: DeepSeekUsage = {
        promptTokens: data.usage?.prompt_tokens ?? 0,
        completionTokens: data.usage?.completion_tokens ?? 0,
        totalTokens: data.usage?.total_tokens ?? 0,
      };

      this.logRequestEnd(requestId, 'success', usage, latencyMs);
      this.trackTokenUsage(options.countryCode, usage.totalTokens);

      return { content, usage, model: data.model ?? model, requestId, latencyMs };
    } catch (error) {
      const latencyMs = Date.now() - startTime;
      if (error instanceof DeepSeekError) throw error;

      const message = error instanceof Error ? error.message : 'Network error';
      this.logRequestEnd(requestId, 'failed', null, latencyMs, message);
      throw new DeepSeekError(message, 'NETWORK_ERROR');
    }
  }

  private logRequestStart(
    messages: ChatMessage[],
    model: string,
    options: DeepSeekCallOptions
  ): number {
    try {
      const db = getDb();
      const result = db
        .insert(deepseekRequests)
        .values({
          agentCode: options.agentCode ?? null,
          countryCode: options.countryCode ?? null,
          model,
          promptTokens: 0,
          completionTokens: 0,
          totalTokens: 0,
          latencyMs: 0,
          status: 'pending',
          messagesCount: messages.length,
          createdAt: new Date().toISOString(),
        })
        .run();
      return Number(result.lastInsertRowid);
    } catch {
      return 0;
    }
  }

  private logRequestEnd(
    requestId: number,
    status: string,
    usage: DeepSeekUsage | null,
    latencyMs: number,
    error?: string
  ): void {
    if (!requestId) return;
    try {
      const db = getDb();
      db.update(deepseekRequests)
        .set({
          status,
          promptTokens: usage?.promptTokens ?? 0,
          completionTokens: usage?.completionTokens ?? 0,
          totalTokens: usage?.totalTokens ?? 0,
          latencyMs,
          error: error ?? null,
        })
        .where(eq(deepseekRequests.id, requestId))
        .run();
    } catch {
      // non-blocking
    }
  }

  private trackTokenUsage(countryCode: string | undefined, tokens: number): void {
    if (!countryCode || tokens === 0) return;
    try {
      const db = getDb();
      db.update(countryAiConfig)
        .set({
          deepseekTokensUsed: sql`${countryAiConfig.deepseekTokensUsed} + ${tokens}`,
          updatedAt: new Date().toISOString(),
        })
        .where(eq(countryAiConfig.countryCode, countryCode))
        .run();
    } catch {
      // non-blocking
    }
  }

  getTotalTokensUsed(countryCode?: string): number {
    try {
      const db = getDb();
      if (countryCode) {
        return (
          db
            .select()
            .from(countryAiConfig)
            .where(eq(countryAiConfig.countryCode, countryCode))
            .get()?.deepseekTokensUsed ?? 0
        );
      }
      const rows = db.select().from(countryAiConfig).all();
      return rows.reduce((sum, r) => sum + r.deepseekTokensUsed, 0);
    } catch {
      return 0;
    }
  }

  parseJson<T>(content: string): T {
    const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    return JSON.parse(cleaned) as T;
  }
}

export class DeepSeekError extends Error {
  constructor(
    message: string,
    public code: string,
    public statusCode?: number
  ) {
    super(message);
    this.name = 'DeepSeekError';
  }
}

export const deepseekService = DeepSeekService.getInstance();
