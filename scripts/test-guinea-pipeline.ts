#!/usr/bin/env tsx
/**
 * Script de teste: Pipeline Guiné
 * Uso: npx tsx scripts/test-guinea-pipeline.ts
 */
import { seedDatabase } from '../src/lib/ai/db/seed';
import { runGuineaTestPipeline } from '../src/lib/ai/agents/orchestrator';

async function main() {
  console.log('🚀 Iniciando teste Guiné — "Comment ouvrir une petite entreprise en Guinée"\n');

  if (!process.env.DEEPSEEK_API_KEY) {
    console.error('❌ DEEPSEEK_API_KEY não configurada. Defina no .env.local');
    process.exit(1);
  }

  seedDatabase();

  try {
    const result = await runGuineaTestPipeline();

    console.log('\n📊 Resultado do pipeline:\n');
    for (const [stage, data] of Object.entries(result.stages)) {
      const icon = data.success ? '✅' : '❌';
      console.log(`  ${icon} ${stage}${data.error ? `: ${data.error}` : ''}`);
    }

    if (result.articleId) {
      console.log(`\n📝 Artigo criado: #${result.articleId} (status: pending_review)`);
      console.log('   Acesse /admin/ai-engine/articles para aprovar.');
    }

    console.log('\n✅ Teste concluído.');
  } catch (error) {
    console.error('❌ Erro:', error instanceof Error ? error.message : error);
    process.exit(1);
  }
}

main();
