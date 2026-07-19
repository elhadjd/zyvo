import { and, eq } from 'drizzle-orm';
import { getDb } from './index';
import { programmaticPages } from './schema';
import { PROGRAMMATIC_INDUSTRIES } from '../seo-engine/types';

function now(): string {
  return new Date().toISOString();
}

const SN_PROGRAMMATIC_SEEDS = [
  {
    industry: 'restaurants',
    title: 'ZYVO ERP pour les restaurants au Sénégal',
    headline: 'Logiciel de gestion pour restaurants et dibiteries à Dakar',
    metaTitle: 'ERP Restaurant Sénégal — Caisse POS & Stock | ZYVO Dakar',
    metaDescription:
      'Gérez votre restaurant ou dibiterie au Sénégal avec ZYVO : caisse POS, stock, Wave, Orange Money, facturation TVA DGI. Essai gratuit 7 jours en FCFA.',
    keywords:
      'ERP restaurant Sénégal, POS dibiterie Dakar, gestion restaurant Sénégal, logiciel caisse restaurant Dakar',
    content: [
      'Les restaurants et dibiteries de Dakar font face à des défis quotidiens : gestion des commandes, suivi des stocks alimentaires, encaissements Wave et Orange Money, et conformité fiscale DGI.',
      'ZYVO ERP centralise la caisse POS, la gestion des stocks et la facturation dans une seule plateforme adaptée aux PME sénégalaises.',
      'Enregistrez chaque vente en FCFA, suivez vos ingrédients en temps réel et générez des rapports pour vos déclarations TVA à 18 %.',
      'Essayez ZYVO gratuitement pendant 7 jours et digitalisez votre établissement au Plateau, Almadies, Pikine ou en province.',
    ],
    faq: [
      {
        question: 'ZYVO accepte-t-il les paiements Wave ?',
        answer:
          'Oui, ZYVO enregistre les paiements Wave, Orange Money et Free Money avec un journal de caisse détaillé.',
      },
      {
        question: 'Le logiciel fonctionne-t-il hors ligne ?',
        answer:
          'Oui, ZYVO fonctionne en mode dégradé et synchronise les données dès que le réseau revient.',
      },
    ],
    cta: 'Essai gratuit 7 jours',
  },
  {
    industry: 'retail-stores',
    title: 'ZYVO ERP pour les boutiques au Sénégal',
    headline: 'Logiciel de gestion commerciale pour boutiques à Dakar',
    metaTitle: 'Logiciel Boutique Sénégal — Caisse POS & Stock | ZYVO',
    metaDescription:
      'ERP pour boutiques et superettes sénégalaises : caisse POS, codes-barres, stock temps réel, Wave et Orange Money. Digitalisez votre commerce à Dakar.',
    keywords:
      'logiciel boutique Sénégal, caisse superette Dakar, gestion commerciale Sénégal, POS retail Dakar',
    content: [
      'Les boutiques et superettes du Sénégal — du Plateau à Pikine, de Sandaga à Thiès — ont besoin d\'un logiciel de gestion commerciale fiable pour suivre stock, ventes et paiements mobiles.',
      'ZYVO offre une caisse POS rapide, la gestion d\'inventaire en temps réel et le suivi des encaissements Wave et Orange Money dans un seul outil en français.',
      'Réduisez les ruptures de stock, contrôlez vos marges en FCFA et générez des rapports pour piloter votre activité au quotidien.',
      'Rejoignez les commerçants sénégalais qui digitalisent leur boutique avec ZYVO — essai gratuit de 7 jours.',
    ],
    faq: [
      {
        question: 'ZYVO convient-il aux petites boutiques de quartier ?',
        answer:
          'Oui, le plan Essentiel est conçu pour les petites boutiques avec caisse POS, stock de base et facturation à partir de 23 900 FCFA/mois.',
      },
      {
        question: 'Puis-je gérer plusieurs magasins ?',
        answer:
          'Oui, à partir du plan Croissance vous centralisez stock et ventes de plusieurs points de vente à Dakar et en province.',
      },
    ],
    cta: 'Démarrer l\'essai gratuit',
  },
  {
    industry: 'pharmacies',
    title: 'ZYVO ERP pour les pharmacies au Sénégal',
    headline: 'Gestion de pharmacie moderne à Dakar',
    metaTitle: 'Logiciel Pharmacie Sénégal — Stock & Caisse POS | ZYVO',
    metaDescription:
      'Solution ERP pour pharmacies sénégalaises : gestion stock médicaments, dates de péremption, caisse POS et conformité SYSCOHADA. Essai gratuit.',
    keywords:
      'logiciel pharmacie Sénégal, gestion stock médicaments Dakar, ERP pharmacie Sénégal, officine Dakar',
    content: [
      'Les pharmacies sénégalaises doivent gérer des stocks sensibles avec dates de péremption, traçabilité des médicaments et conformité réglementaire.',
      'ZYVO ERP offre un suivi d\'inventaire en temps réel, des alertes de péremption et une caisse POS intégrée pour vos ventes en FCFA.',
      'Générez des factures conformes SYSCOHADA et préparez vos déclarations fiscales à la DGI en quelques clics.',
      'Digitalisez votre officine à Dakar, Thiès ou Saint-Louis avec ZYVO — essai gratuit de 7 jours.',
    ],
    faq: [
      {
        question: 'ZYVO gère-t-il les dates de péremption ?',
        answer: 'Oui, ZYVO alerte automatiquement sur les produits proches de la date de péremption.',
      },
      {
        question: 'Le logiciel est-il conforme SYSCOHADA ?',
        answer: 'Oui, ZYVO génère des documents comptables conformes au référentiel OHADA.',
      },
    ],
    cta: 'Essai gratuit 7 jours',
  },
] as const;

export function seedSenegalProgrammaticPages(): number {
  const db = getDb();
  const timestamp = now();
  let seeded = 0;

  for (const seed of SN_PROGRAMMATIC_SEEDS) {
    const existing = db
      .select()
      .from(programmaticPages)
      .where(and(eq(programmaticPages.country, 'sn'), eq(programmaticPages.industry, seed.industry)))
      .get();

    if (existing) continue;

    const industryDef = PROGRAMMATIC_INDUSTRIES.find((i) => i.slug === seed.industry);
    if (!industryDef) continue;

    db.insert(programmaticPages)
      .values({
        slug: seed.industry,
        country: 'sn',
        industry: seed.industry,
        language: 'fr',
        title: seed.title,
        metaTitle: seed.metaTitle,
        metaDescription: seed.metaDescription,
        headline: seed.headline,
        content: [...seed.content],
        faq: [...seed.faq],
        cta: seed.cta,
        keywords: seed.keywords,
        schemaData: {},
        status: 'published',
        createdAt: timestamp,
        updatedAt: timestamp,
        publishedAt: timestamp,
      })
      .run();
    seeded++;
  }

  return seeded;
}
