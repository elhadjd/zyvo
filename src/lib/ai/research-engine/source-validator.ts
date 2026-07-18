import { deepseekService } from '../services/deepseek-service';
import { getManagedSourceById } from './source-manager';
import { logResearchEvent } from './research-logger';
import type { SupportedCountry, ValidationStatus } from './types';

export interface ValidationResult {
  status: ValidationStatus;
  trustScore: number;
  issues: { type: string; detail: string; severity: 'low' | 'medium' | 'high' }[];
  notes: string;
  isCurrent: boolean;
}

export async function validateSource(
  countryCode: SupportedCountry,
  sourceId: number,
  content: string,
  title: string
): Promise<ValidationResult> {
  const source = getManagedSourceById(sourceId);
  if (!source) {
    return {
      status: 'requires_review',
      trustScore: 0,
      issues: [{ type: 'source', detail: 'Fonte não encontrada no registo', severity: 'high' }],
      notes: 'Fonte não registada',
      isCurrent: false,
    };
  }

  logResearchEvent(countryCode, 'source_validator', 'validate', `Validando: ${source.name}`);

  const response = await deepseekService.chat(
    [
      {
        role: 'system',
        content: `Tu es validateur de sources pour contenu business en ${countryCode.toUpperCase()}.
Vérifie:
1. La source existe et est crédible (type: ${source.type}, confiance: ${source.trustLevel}/100)
2. L'information semble actuelle (pas obsolète)
3. Pas de conflits évidents
4. Pertinence pour entrepreneurs locaux

Résultat: "validated" ou "requires_review"
Réponds en JSON:
{"status":"validated|requires_review","trustScore":85,"issues":[{"type":"...","detail":"...","severity":"low|medium|high"}],"notes":"...","isCurrent":true}`,
      },
      {
        role: 'user',
        content: `Source: ${source.name} (${source.url})
Titre: ${title}
Contenu extrait (extrait):
${content.slice(0, 3000)}`,
      },
    ],
    { jsonMode: true, temperature: 0.1, agentCode: 'research', countryCode }
  );

  return deepseekService.parseJson<ValidationResult>(response.content);
}

export async function validateDocumentBatch(
  countryCode: SupportedCountry,
  documents: { sourceId: number; title: string; content: string }[]
): Promise<ValidationResult[]> {
  const results: ValidationResult[] = [];
  for (const doc of documents) {
    const result = await validateSource(countryCode, doc.sourceId, doc.content, doc.title);
    results.push(result);
  }
  return results;
}
