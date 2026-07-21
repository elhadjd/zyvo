import assert from 'node:assert/strict';
import { topicSimilarity, wasTopicAlreadyCovered } from '../src/lib/ai/research-engine/topic-dedup';

assert(topicSimilarity('TVA 18% Guinée entreprise', 'TVA Guinée PME déclaration') > 0.3);
assert(topicSimilarity('marketing WhatsApp Conakry', 'gestion stock boutique') < 0.3);

assert(
  wasTopicAlreadyCovered('gn', 'TVA 18% Guinée : tout ce que votre entreprise doit savoir', {
    corpus: [
      {
        title: 'TVA 18% en Guinée : guide complet pour PME',
        slug: 'tva-18-guinee-guide-pme',
        excerpt: 'Comprendre la TVA en Guinée',
        keywords: 'TVA Guinée, DGI',
        createdAt: new Date().toISOString(),
        status: 'published',
      },
    ],
  })
);

assert(
  !wasTopicAlreadyCovered('gn', 'intelligence artificielle pour restaurants à Conakry', {
    corpus: [
      {
        title: 'TVA 18% en Guinée : guide complet pour PME',
        slug: 'tva-18-guinee-guide-pme',
        excerpt: 'Comprendre la TVA en Guinée',
        keywords: 'TVA Guinée, DGI',
        createdAt: new Date().toISOString(),
        status: 'published',
      },
    ],
  })
);

console.log('All topic dedup tests passed.');
