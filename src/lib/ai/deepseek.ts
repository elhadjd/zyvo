import type { DeepSeekUsage } from './types';

const DEEPSEEK_API_URL = 'https://api.deepseek.com/chat/completions';
const DEFAULT_MODEL = 'deepseek-chat';

export interface ChatMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export interface DeepSeekOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  jsonMode?: boolean;
}

export interface DeepSeekResponse {
  content: string;
  usage: DeepSeekUsage;
  model: string;
}

let totalTokensUsed = 0;

export function getTotalTokensUsed(): number {
  return totalTokensUsed;
}

export function resetTokenCounter(): void {
  totalTokensUsed = 0;
}

export async function callDeepSeek(
  messages: ChatMessage[],
  options: DeepSeekOptions = {}
): Promise<DeepSeekResponse> {
  const apiKey = process.env.DEEPSEEK_API_KEY;

  if (!apiKey) {
    throw new Error('DEEPSEEK_API_KEY não configurada. Defina a variável de ambiente.');
  }

  const body: Record<string, unknown> = {
    model: options.model ?? DEFAULT_MODEL,
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
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`DeepSeek API error (${response.status}): ${errorText}`);
  }

  const data = await response.json();
  const content = data.choices?.[0]?.message?.content ?? '';
  const usage: DeepSeekUsage = {
    promptTokens: data.usage?.prompt_tokens ?? 0,
    completionTokens: data.usage?.completion_tokens ?? 0,
    totalTokens: data.usage?.total_tokens ?? 0,
  };

  totalTokensUsed += usage.totalTokens;

  return {
    content,
    usage,
    model: data.model ?? DEFAULT_MODEL,
  };
}

export function parseJsonResponse<T>(content: string): T {
  const cleaned = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
  return JSON.parse(cleaned) as T;
}
