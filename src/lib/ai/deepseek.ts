import type { ChatMessage, DeepSeekCallOptions, DeepSeekCallResult } from './services/deepseek-service';
import { deepseekService } from './services/deepseek-service';

export type { ChatMessage, DeepSeekCallOptions, DeepSeekCallResult };
export { deepseekService, DeepSeekService, DeepSeekError } from './services/deepseek-service';

export interface DeepSeekOptions {
  model?: string;
  temperature?: number;
  maxTokens?: number;
  jsonMode?: boolean;
  agentCode?: string;
  countryCode?: string;
}

export interface DeepSeekResponse {
  content: string;
  usage: { promptTokens: number; completionTokens: number; totalTokens: number };
  model: string;
}

/** @deprecated Use deepseekService.chat() instead */
export async function callDeepSeek(
  messages: ChatMessage[],
  options: DeepSeekOptions = {}
): Promise<DeepSeekResponse> {
  const result = await deepseekService.chat(messages, options);
  return {
    content: result.content,
    usage: result.usage,
    model: result.model,
  };
}

export function parseJsonResponse<T>(content: string): T {
  return deepseekService.parseJson<T>(content);
}

export function getTotalTokensUsed(countryCode?: string): number {
  return deepseekService.getTotalTokensUsed(countryCode);
}
