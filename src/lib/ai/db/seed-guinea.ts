import { and, eq } from 'drizzle-orm';
import { getDb } from './index';
import { programmaticPages } from './schema';
import { syncAllSitemaps } from '../seo-engine/sitemap-manager';
import { PROGRAMMATIC_INDUSTRIES } from '../seo-engine/types';

function now(): string {
  return new Date().toISOString();
}

const GN_PROGRAMMATIC_SEEDS = [
  {
    industry: 'restaurants',
    title: 'ZYVO ERP pour les restaurants en Guinée',
    headline: 'Logiciel de gestion pour restaurants et maquis à Conakry',
    metaTitle: 'ERP Restaurant Guinée — Caisse POS & Stock | ZYVO',
    metaDescription:
      'Gérez votre restaurant ou maquis en Guinée avec ZYVO : caisse POS, stock, Orange Money, facturation TVA DGI. Essai gratuit 7 jours.',
    keywords: 'ERP restaurant Guinée, POS maquis Conakry, gestion restaurant Guinée',
    content: [
      'Les restaurants et maquis de Conakry font face à des défis quotidiens : gestion des commandes, suivi des stocks alimentaires, encaissements Orange Money et conformité fiscale DGI.',
      'ZYVO ERP centralise la caisse POS, la gestion des stocks et la facturation dans une seule plateforme adaptée aux PME guinéennes.',
      'Enregistrez chaque vente en GNF, suivez vos ingrédients en temps réel et générez des rapports pour vos déclarations TVA à 18 %.',
      'Essayez ZYVO gratuitement pendant 7 jours et digitalisez votre établissement à Kaloum, Ratoma ou en province.',
    ],
    faq: [
      {
        question: 'ZYVO fonctionne-t-il sans connexion internet ?',
        answer: 'Oui, ZYVO fonctionne en mode hors ligne et synchronise les données dès que le réseau revient.',
      },
      {
        question: 'Puis-je accepter Orange Money à la caisse ?',
        answer: 'Oui, ZYVO enregistre les paiements Orange Money et MTN MoMo avec un journal de caisse détaillé.',
      },
    ],
    cta: 'Essai gratuit 7 jours',
  },
  {
    industry: 'pharmacies',
    title: 'ZYVO ERP pour les pharmacies en Guinée',
    headline: 'Gestion de pharmacie moderne à Conakry',
    metaTitle: 'Logiciel Pharmacie Guinée — Stock & Caisse POS | ZYVO',
    metaDescription:
      'Solution ERP pour pharmacies guinéennes : gestion stock médicaments, dates de péremption, caisse POS et conformité SYSCOHADA.',
    keywords: 'logiciel pharmacie Guinée, gestion stock médicaments Conakry, ERP pharmacie Guinée',
    content: [
      'Les pharmacies guinéennes doivent gérer des stocks sensibles avec dates de péremption, traçabilité des médicaments et conformité réglementaire.',
      'ZYVO ERP offre un suivi d\'inventaire en temps réel, des alertes de péremption et une caisse POS intégrée pour vos ventes en GNF.',
      'Générez des factures conformes SYSCOHADA et préparez vos déclarations fiscales à la DGI en quelques clics.',
      'Rejoignez les pharmacies qui digitalisent leur gestion à Conakry avec ZYVO — essai gratuit de 7 jours.',
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
    cta: 'Démarrer l\'essai gratuit',
  },
] as const;

export function seedGuineaProgrammaticPages(): number {
  const db = getDb();
  const timestamp = now();
  let seeded = 0;

  for (const seed of GN_PROGRAMMATIC_SEEDS) {
    const existing = db
      .select()
      .from(programmaticPages)
      .where(and(eq(programmaticPages.country, 'gn'), eq(programmaticPages.industry, seed.industry)))
      .get();

    if (existing) continue;

    const industryDef = PROGRAMMATIC_INDUSTRIES.find((i) => i.slug === seed.industry);
    if (!industryDef) continue;

    db.insert(programmaticPages)
      .values({
        slug: seed.industry,
        country: 'gn',
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

export function seedGuineaSitemaps(): void {
  seedGuineaProgrammaticPages();
}
