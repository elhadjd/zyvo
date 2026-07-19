import { desc, eq } from 'drizzle-orm';
import { deepseekService } from '../services/deepseek-service';
import { getCountryConfig } from '../countries';
import { logAiEvent } from '../logger';
import { createTask, completeTask, failTask, isAgentEnabled } from './task-helpers';
import { getDb } from '../db';
import { contentArticles } from '../db/schema';
import type { AgentContext } from '../types';

function now(): string {
  return new Date().toISOString();
}

interface TranslationResult {
  language: string;
  title: string;
  excerpt: string;
  introduction: string;
  content: string[];
  faq: { question: string; answer: string }[];
  conclusion: string;
  cta: string;
}

export async function runTranslationAgent(ctx: AgentContext): Promise<TranslationResult | null> {
  if (!isAgentEnabled('translation')) {
    throw new Error('Translation Agent está desativado');
  }

  const config = getCountryConfig(ctx.countryCode);
  if (!config) throw new Error(`País não configurado: ${ctx.countryCode}`);

  const taskId = createTask('translation', ctx.countryCode, 'prepare_translation');
  logAiEvent('translation', `Preparando traduções para ${config.countryName}`, { countryCode: ctx.countryCode });

  try {
    const db = getDb();
    const article = db
      .select()
      .from(contentArticles)
      .where(eq(contentArticles.countryCode, ctx.countryCode))
      .orderBy(desc(contentArticles.createdAt))
      .limit(1)
      .get();

    if (!article || !['approved', 'pending_review'].includes(article.status)) {
      completeTask(taskId, 'translation', { translated: false });
      return null;
    }

    const targetLanguages = ['fr', 'pt', 'en'].filter((l) => l !== config.language);
    const targetLang = targetLanguages[0] ?? 'en';

    const langNames: Record<string, string> = {
      fr: 'français',
      pt: 'português',
      en: 'English',
    };

    const response = await deepseekService.chat(
      [
        {
          role: 'system',
          content: `Tu traduis du contenu business ZYVO ERP vers ${langNames[targetLang]}.
Garde le ton professionnel et adapte au contexte local de ${config.countryName}.
Réponds en JSON:
{"language":"${targetLang}","title":"...","excerpt":"...","introduction":"...","content":["..."],"faq":[{"question":"...","answer":"..."}],"conclusion":"...","cta":"..."}`,
        },
        {
          role: 'user',
          content: `Traduis cet article:\n${JSON.stringify({
            title: article.title,
            excerpt: article.excerpt,
            introduction: article.introduction,
            content: article.content,
            faq: article.faq,
            conclusion: article.conclusion,
            cta: article.cta,
          }, null, 2)}`,
        },
      ],
      { jsonMode: true, temperature: 0.3, agentCode: 'translation', countryCode: ctx.countryCode }
    );

    const translation = deepseekService.parseJson<TranslationResult>(response.content);

    completeTask(taskId, 'translation', {
      articleId: article.id,
      targetLanguage: translation.language,
      tokensUsed: response.usage.totalTokens,
      note: 'Translation prepared for future multi-language expansion',
    });

    logAiEvent('translation', `Tradução preparada (${translation.language}): ${article.title}`, {
      countryCode: ctx.countryCode,
    });

    return translation;
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Erro desconhecido';
    failTask(taskId, 'translation', message);
    logAiEvent('translation', message, { countryCode: ctx.countryCode, level: 'error' });
    throw error;
  }
}
