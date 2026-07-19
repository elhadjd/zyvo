import { eq } from 'drizzle-orm';
import { deepseekService } from '../services/deepseek-service';
import type { ChatMessage } from '../services/deepseek-service';
import { getDb } from '../db';
import { aiAgents } from '../db/schema';
import { logAiEvent } from '../logger';
import { createTask, completeTask, failTask, isAgentEnabled } from './task-helpers';
import type { AgentCode, AgentContext } from '../types';
import type { AgentPromptConfig } from './prompts';

export abstract class BaseAgent<TResult = unknown> {
  abstract readonly code: AgentCode;
  abstract readonly taskType: string;

  protected abstract getPromptConfig(ctx: AgentContext): AgentPromptConfig;
  protected abstract buildUserMessage(ctx: AgentContext): string;
  protected abstract processResult(
    ctx: AgentContext,
    taskId: number,
    raw: string,
    tokensUsed: number
  ): Promise<TResult>;

  protected useJsonMode = true;
  protected temperature = 0.3;
  protected maxTokens = 4096;

  async run(ctx: AgentContext): Promise<TResult> {
    if (!isAgentEnabled(this.code)) {
      throw new Error(`${this.code} Agent está desativado`);
    }

    const promptConfig = this.getPromptConfig(ctx);
    const taskId = createTask(this.code, ctx.countryCode, this.taskType);

    logAiEvent(this.code, `Iniciando: ${promptConfig.objective}`, {
      countryCode: ctx.countryCode,
      metadata: { topic: ctx.topic },
    });

    try {
      const messages: ChatMessage[] = [
        { role: 'system', content: promptConfig.systemPrompt },
        { role: 'user', content: this.buildUserMessage(ctx) },
      ];

      const response = await deepseekService.chat(messages, {
        jsonMode: this.useJsonMode,
        temperature: this.temperature,
        maxTokens: this.maxTokens,
        agentCode: this.code,
        countryCode: ctx.countryCode,
      });

      const result = await this.processResult(ctx, taskId, response.content, response.usage.totalTokens);

      completeTask(taskId, this.code, {
        tokensUsed: response.usage.totalTokens,
        latencyMs: response.latencyMs,
      });

      logAiEvent(this.code, `Concluído com sucesso`, {
        countryCode: ctx.countryCode,
        metadata: { tokens: response.usage.totalTokens },
      });

      return result;
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Erro desconhecido';
      failTask(taskId, this.code, message);
      logAiEvent(this.code, message, { countryCode: ctx.countryCode, level: 'error' });
      throw error;
    }
  }

  getAgentInfo(): { name: string; description: string; objective: string; enabled: boolean } | null {
    const db = getDb();
    const agent = db.select().from(aiAgents).where(eq(aiAgents.code, this.code)).get();
    const prompt = this.getPromptConfig({ countryCode: 'gn' });
    return {
      name: agent?.name ?? prompt.name,
      description: agent?.description ?? prompt.description,
      objective: agent?.objective ?? prompt.objective,
      enabled: agent?.enabled ?? true,
    };
  }
}
