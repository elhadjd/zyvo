import { getCountryConfig } from '../../countries';
import { deepseekService } from '../../services/deepseek-service';
import { getManagedSourceById } from '../source-manager';
import { logResearchEvent } from '../research-logger';
import type { SupportedCountry, ValidationStatus } from '../types';

export async function runSourceValidatorAgent(
  countryCode: SupportedCountry,
  sourceId: number,
  content: string,
  title: string
): Promise<{ status: ValidationStatus; trustScore: number; notes: string }> {
  const source = getManagedSourceById(sourceId);
  const config = getCountryConfig(countryCode);

  if (!source) {
    return { status: 'requires_review', trustScore: 0, notes: 'Fonte não registada' };
  }

  const response = await deepseekService.chat(
    [
      {
        role: 'system',
        content: `Validateur de sources pour ${config?.countryName ?? countryCode}.
Source: ${source.name} (${source.type}, confiance ${source.trustLevel}/100)
Vérifie: existence, fiabilité, actualité, conflits.
Résultat: "validated" ou "requires_review"
JSON: {"status":"validated|requires_review","trustScore":85,"notes":"..."}`,
      },
      {
        role: 'user',
        content: `Titre: ${title}\nContenu:\n${content.slice(0, 2500)}`,
      },
    ],
    { jsonMode: true, temperature: 0.1, agentCode: 'research', countryCode }
  );

  const result = deepseekService.parseJson<{ status: ValidationStatus; trustScore: number; notes: string }>(response.content);

  logResearchEvent(countryCode, 'source_validator', 'validated', `${source.name}: ${result.status}`, {
    sourceId,
    trustScore: result.trustScore,
  });

  return result;
}
