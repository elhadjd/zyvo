import type { MarketCode } from '@/lib/markets/types';
import type { PartnershipHubContent, PartnershipProgram } from './types';
import type { PartnershipProgramSlug } from './types';

type LocaleKey = 'en' | 'fr';

function localeForMarket(code: MarketCode): LocaleKey {
  return code === 'us' ? 'en' : 'fr';
}

function countryLabel(code: MarketCode): string {
  if (code === 'gn') return 'Guinée';
  if (code === 'sn') return 'Sénégal';
  if (code === 'ci') return 'Côte d\'Ivoire';
  return 'United States';
}

const hubEn: Omit<PartnershipHubContent, 'title'> = {
  headline: 'Grow with ZYVO — Partnership Programs',
  subtitle: 'Resell, refer, implement, or promote ZYVO business software and earn recurring revenue.',
  intro:
    'ZYVO partners help local businesses adopt modern POS, inventory, and ERP tools. Whether you are a consultant, agency, integrator, or community leader, we offer structured programs with marketing support, training, and transparent commissions.',
  whyPartnerTitle: 'Why partner with ZYVO?',
  whyPartnerPoints: [
    { title: 'Recurring revenue', description: 'Earn commissions on subscriptions and renewals — not just one-time fees.' },
    { title: 'Proven product', description: 'Cloud ERP with POS, inventory, HR, invoicing, and analytics in one platform.' },
    { title: 'Partner enablement', description: 'Sales decks, demo environments, onboarding playbooks, and co-marketing assets.' },
    { title: 'Dedicated support', description: 'Partner success manager, priority technical support, and deal registration.' },
  ],
  howItWorksTitle: 'How it works',
  howItWorksSteps: [
    { step: '1', title: 'Apply online', description: 'Tell us about your business and the clients you serve.' },
    { step: '2', title: 'Get approved', description: 'We review your profile and match you with the right program tier.' },
    { step: '3', title: 'Launch & earn', description: 'Start referring or selling ZYVO with our tools and track your commissions.' },
  ],
  programsTitle: 'Choose your partnership track',
  programsSubtitle: 'Four programs designed for different go-to-market models.',
  ctaTitle: 'Ready to become a ZYVO partner?',
  ctaSubtitle: 'Join consultants, agencies, and business networks growing with ZYVO across the US.',
  ctaButton: 'Apply now',
  contactButton: 'Talk to partnerships team',
};

const hubFr: Omit<PartnershipHubContent, 'title'> = {
  headline: 'Programme de partenariat ZYVO',
  subtitle: 'Revendez, recommandez, intégrez ou promouvez ZYVO et générez des revenus récurrents.',
  intro:
    'Les partenaires ZYVO accompagnent les PME dans l\'adoption de caisses POS, de gestion de stock et d\'ERP cloud. Que vous soyez cabinet comptable, intégrateur IT, association professionnelle ou influenceur business, nous proposons des programmes structurés avec formation, supports marketing et commissions transparentes.',
  whyPartnerTitle: 'Pourquoi devenir partenaire ZYVO ?',
  whyPartnerPoints: [
    { title: 'Revenus récurrents', description: 'Commissions sur les abonnements et renouvellements — pas seulement à la signature.' },
    { title: 'Produit éprouvé', description: 'ERP cloud : caisse POS, stock, RH, facturation TVA et rapports en un seul outil.' },
    { title: 'Kit partenaire', description: 'Présentations, environnement démo, guides d\'onboarding et assets co-brandés.' },
    { title: 'Support dédié', description: 'Responsable partenaires, support technique prioritaire et enregistrement des deals.' },
  ],
  howItWorksTitle: 'Comment ça marche',
  howItWorksSteps: [
    { step: '1', title: 'Candidature en ligne', description: 'Décrivez votre activité et les clients que vous servez.' },
    { step: '2', title: 'Validation', description: 'Nous étudions votre profil et vous attribuons le bon niveau de partenariat.' },
    { step: '3', title: 'Lancement', description: 'Commencez à vendre ou recommander ZYVO avec nos outils et suivez vos commissions.' },
  ],
  programsTitle: 'Choisissez votre programme',
  programsSubtitle: 'Quatre parcours adaptés à différents modèles commerciaux.',
  ctaTitle: 'Devenir partenaire ZYVO',
  ctaSubtitle: 'Rejoignez les cabinets, intégrateurs et réseaux qui font grandir ZYVO en Afrique de l\'Ouest.',
  ctaButton: 'Postuler maintenant',
  contactButton: 'Parler à l\'équipe partenariats',
};

function buildProgramsEn(): Record<PartnershipProgramSlug, PartnershipProgram> {
  return {
    reseller: {
      slug: 'reseller',
      title: 'Reseller Partner Program',
      shortTitle: 'Reseller',
      tagline: 'Sell ZYVO ERP under your brand with wholesale pricing and deal protection.',
      description:
        'Ideal for IT resellers, business consultants, and VARs serving retail, restaurants, salons, and service businesses. Offer implementation, training, and local support while ZYVO powers the platform.',
      audience: 'IT resellers, consultants, and agencies with an existing SMB client base.',
      benefits: [
        { title: 'Wholesale margins', description: 'Competitive partner pricing with volume tiers and renewal commissions.' },
        { title: 'Deal registration', description: 'Protect your opportunities with registered deals and partner exclusivity windows.' },
        { title: 'White-label options', description: 'Co-branded onboarding and partner-led implementations.' },
        { title: 'Sales enablement', description: 'Demo tenants, battle cards, ROI calculators, and proposal templates.' },
      ],
      requirements: [
        'Registered business with tax ID',
        'Minimum 3 qualified SMB prospects per quarter',
        'Basic POS/ERP sales experience preferred',
        'Commitment to customer onboarding support',
      ],
      faq: [
        { question: 'What commission do resellers earn?', answer: 'Margins vary by tier and volume. Approved partners receive a detailed rate card after application review.' },
        { question: 'Can I implement ZYVO for my clients?', answer: 'Yes. Resellers can deliver setup, training, and ongoing support. We provide implementation guides and sandbox access.' },
        { question: 'Is there a minimum commitment?', answer: 'No long-term contract. We expect active pipeline development and professional client support.' },
      ],
      cta: 'Apply as a reseller',
    },
    referral: {
      slug: 'referral',
      title: 'Referral Partner Program',
      shortTitle: 'Referral',
      tagline: 'Introduce businesses to ZYVO and earn for every successful subscription.',
      description:
        'Perfect for accountants, business coaches, chamber of commerce networks, and professionals who advise SMB owners. Share your referral link — we handle sales, onboarding, and billing.',
      audience: 'Accountants, coaches, associations, and advisors who influence SMB software decisions.',
      benefits: [
        { title: 'Simple referral links', description: 'Unique tracking links and dashboard to monitor signups and payouts.' },
        { title: 'Fast payouts', description: 'Commissions paid after the referred customer completes their first paid month.' },
        { title: 'No technical setup', description: 'You introduce — ZYVO closes, onboards, and supports the client.' },
        { title: 'Co-marketing', description: 'Webinars, newsletter content, and event kits for your community.' },
      ],
      requirements: [
        'Professional network or audience of SMB owners',
        'Agreement to ethical referral practices',
        'Valid payment details for commission payouts',
      ],
      faq: [
        { question: 'How much can I earn per referral?', answer: 'Referral partners earn a fixed bounty plus optional renewal bonuses depending on plan and market.' },
        { question: 'Do I need to demo the product?', answer: 'No. You can simply share your link. Optional demo training is available if you want to present ZYVO yourself.' },
        { question: 'Can I refer clients outside my country?', answer: 'Referrals are attributed to the market where the customer signs up (US, Guinea, Senegal, or Côte d\'Ivoire).' },
      ],
      cta: 'Join referral program',
    },
    implementation: {
      slug: 'implementation',
      title: 'Implementation Partner Program',
      shortTitle: 'Implementation',
      tagline: 'Deliver ZYVO deployments, migrations, and training as a certified integrator.',
      description:
        'Built for system integrators and digital transformation firms that configure ERP, migrate data, train staff, and provide tier-1 support for multi-location businesses.',
      audience: 'System integrators, ERP consultants, and IT firms specializing in SMB deployments.',
      benefits: [
        { title: 'Implementation fees', description: 'Charge professional services on top of ZYVO subscriptions you facilitate.' },
        { title: 'Certification path', description: 'Technical certification, solution architect office hours, and migration tooling.' },
        { title: 'Priority engineering', description: 'Escalation channel for complex integrations and custom workflows.' },
        { title: 'Project leads', description: 'Receive qualified implementation opportunities from ZYVO sales in your territory.' },
      ],
      requirements: [
        'Demonstrated ERP/POS implementation experience',
        'At least one certified consultant on the team',
        'Ability to deliver training in local language',
        'SLA-aligned support for deployed customers',
      ],
      faq: [
        { question: 'Do implementation partners also resell licenses?', answer: 'Yes. Most integrators combine resale margins with professional services revenue.' },
        { question: 'Is certification required?', answer: 'Certification is recommended and required for premium partner tier and lead sharing.' },
        { question: 'What industries do you support?', answer: 'Retail, restaurants, salons, pharmacies, supermarkets, logistics, and general services.' },
      ],
      cta: 'Become an implementation partner',
    },
    affiliate: {
      slug: 'affiliate',
      title: 'Affiliate & Content Partner Program',
      shortTitle: 'Affiliate',
      tagline: 'Monetize your audience with content, reviews, and campaigns promoting ZYVO.',
      description:
        'For bloggers, YouTubers, newsletter publishers, and digital marketers who create content about business software, entrepreneurship, and digitalization for SMBs.',
      audience: 'Content creators, media sites, and marketers with SMB-focused audiences.',
      benefits: [
        { title: 'Performance commissions', description: 'CPA and rev-share models based on traffic quality and conversion.' },
        { title: 'Creative assets', description: 'Banners, landing pages, email templates, and localized ad copy.' },
        { title: 'Campaign tracking', description: 'UTM dashboards, conversion reporting, and A/B test support.' },
        { title: 'Early access', description: 'Preview new features and exclusive angles for your content calendar.' },
      ],
      requirements: [
        'Public channel with business or tech audience',
        'Compliance with FTC / ASA disclosure guidelines',
        'No brand bidding on ZYVO trademarks without approval',
      ],
      faq: [
        { question: 'Can I run paid ads?', answer: 'Yes, with pre-approved creatives. Trademark bidding requires written approval.' },
        { question: 'What is the cookie window?', answer: 'Standard 60-day attribution window from first click to paid subscription.' },
        { question: 'Do you provide localized creatives?', answer: 'Yes — English for the US and French assets for West African markets.' },
      ],
      cta: 'Join affiliate program',
    },
  };
}

function buildProgramsFr(country: string): Record<PartnershipProgramSlug, PartnershipProgram> {
  return {
    reseller: {
      slug: 'reseller',
      title: 'Programme Revendeur ZYVO',
      shortTitle: 'Revendeur',
      tagline: `Vendez ZYVO en ${country} avec des tarifs partenaires et protection des opportunités.`,
      description:
        `Conçu pour les revendeurs IT, cabinets de conseil et intégrateurs qui servent boutiques, restaurants, salons et PME de services. Proposez déploiement, formation et support local — ZYVO fournit la plateforme cloud.`,
      audience: 'Revendeurs IT, consultants et agences avec un portefeuille PME actif.',
      benefits: [
        { title: 'Marges revendeur', description: 'Tarifs partenaires compétitifs avec paliers de volume et commissions sur renouvellements.' },
        { title: 'Enregistrement des deals', description: 'Protégez vos opportunités commerciales avec fenêtre d\'exclusivité partenaire.' },
        { title: 'Onboarding co-brandé', description: 'Déploiements menés par le partenaire avec guides et environnement démo.' },
        { title: 'Kit commercial', description: 'Présentations, fiches ROI, modèles de devis et argumentaires sectoriels.' },
      ],
      requirements: [
        'Entreprise enregistrée avec RCCM / NIF',
        'Minimum 3 prospects PME qualifiés par trimestre',
        'Expérience vente logiciel ou ERP appréciée',
        'Engagement sur l\'accompagnement client',
      ],
      faq: [
        { question: 'Quelle commission pour les revendeurs ?', answer: 'Les marges varient selon le palier et le volume. Grille tarifaire fournie après validation de candidature.' },
        { question: 'Puis-je déployer ZYVO pour mes clients ?', answer: 'Oui. Configuration, import de données, formation équipe — avec nos guides et bac à sable technique.' },
        { question: 'Y a-t-il un engagement minimum ?', answer: 'Pas de contrat longue durée. Nous attendons un pipeline actif et un support client professionnel.' },
      ],
      cta: 'Postuler comme revendeur',
    },
    referral: {
      slug: 'referral',
      title: 'Programme de Parrainage ZYVO',
      shortTitle: 'Parrainage',
      tagline: `Recommandez ZYVO aux PME de ${country} et touchez une commission à chaque abonnement.`,
      description:
        'Idéal pour experts-comptables, coaches business, chambres de commerce et réseaux d\'entrepreneurs. Partagez votre lien de parrainage — ZYVO gère la vente, l\'onboarding et la facturation.',
      audience: 'Comptables, conseillers, associations et prescripteurs influençant les choix logiciels des PME.',
      benefits: [
        { title: 'Liens trackés', description: 'Lien unique et tableau de bord pour suivre inscriptions et paiements.' },
        { title: 'Paiements rapides', description: 'Commission versée après le premier mois payé du client parrainé.' },
        { title: 'Zéro technique', description: 'Vous recommandez — ZYVO démo, déploie et supporte le client.' },
        { title: 'Co-marketing', description: 'Webinaires, contenus newsletter et kits événementiels pour votre réseau.' },
      ],
      requirements: [
        'Réseau professionnel ou audience de chefs d\'entreprise',
        'Respect des pratiques de parrainage éthiques',
        'Coordonnées bancaires ou Mobile Money pour paiements',
      ],
      faq: [
        { question: 'Combien puis-je gagner par parrainage ?', answer: 'Prime fixe par client converti, plus bonus de renouvellement selon le plan souscrit.' },
        { question: 'Dois-je faire la démo ?', answer: 'Non. Partagez simplement votre lien. Formation démo optionnelle disponible.' },
        { question: 'Puis-je parrainer hors de mon pays ?', answer: 'Le parrainage est attribué au marché où le client s\'inscrit (GN, SN ou CI).' },
      ],
      cta: 'Rejoindre le programme parrainage',
    },
    implementation: {
      slug: 'implementation',
      title: 'Partenaire Intégrateur ZYVO',
      shortTitle: 'Intégrateur',
      tagline: `Déployez ZYVO pour vos clients en ${country} : migration, paramétrage et formation.`,
      description:
        'Pour les intégrateurs IT et cabinets de transformation digitale qui configurent l\'ERP, migrent les données, forment les équipes et assurent le support de proximité.',
      audience: 'Intégrateurs, consultants ERP et sociétés IT spécialisées PME.',
      benefits: [
        { title: 'Honoraires de déploiement', description: 'Facturez vos prestations en plus des abonnements ZYVO que vous apportez.' },
        { title: 'Certification', description: 'Parcours technique, permanences architectes et outils de migration.' },
        { title: 'Escalade prioritaire', description: 'Canal ingénierie pour intégrations complexes et workflows métier.' },
        { title: 'Leads projets', description: 'Opportunités d\'implémentation qualifiées dans votre zone géographique.' },
      ],
      requirements: [
        'Expérience déploiement ERP/POS démontrable',
        'Au moins un consultant certifié dans l\'équipe',
        'Formation en français pour les utilisateurs finaux',
        'Support client aligné sur nos SLA',
      ],
      faq: [
        { question: 'Les intégrateurs revendent-ils aussi les licences ?', answer: 'Oui. La plupart combinent marge revendeur et prestations de services.' },
        { question: 'La certification est-elle obligatoire ?', answer: 'Recommandée et requise pour le palier premium et le partage de leads.' },
        { question: 'Quels secteurs sont couverts ?', answer: 'Commerce, restauration, salons, pharmacies, supermarchés, logistique et services.' },
      ],
      cta: 'Devenir intégrateur certifié',
    },
    affiliate: {
      slug: 'affiliate',
      title: 'Programme Affilié & Contenu ZYVO',
      shortTitle: 'Affilié',
      tagline: `Monétisez votre audience en ${country} avec du contenu sur la digitalisation PME.`,
      description:
        'Pour blogueurs, créateurs YouTube, newsletters et marketers digitaux qui parlent d\'entrepreneuriat, gestion d\'entreprise et outils cloud aux PME.',
      audience: 'Créateurs de contenu, médias et marketers avec audience business.',
      benefits: [
        { title: 'Commissions performance', description: 'Modèles CPA et partage de revenus selon qualité du trafic.' },
        { title: 'Assets créatifs', description: 'Bannières, landing pages, emails et copy publicitaire localisés.' },
        { title: 'Suivi campagnes', description: 'Dashboard UTM, reporting conversions et support A/B tests.' },
        { title: 'Accès anticipé', description: 'Avant-premières fonctionnalités pour votre calendrier éditorial.' },
      ],
      requirements: [
        'Canal public avec audience business ou tech',
        'Mention de partenariat conforme aux règles publicitaires',
        'Pas d\'enchères sur la marque ZYVO sans accord écrit',
      ],
      faq: [
        { question: 'Puis-je faire de la publicité payante ?', answer: 'Oui avec créatifs pré-approuvés. Enchères marque soumises à validation.' },
        { question: 'Quelle durée d\'attribution ?', answer: 'Fenêtre standard de 60 jours entre le clic et l\'abonnement payé.' },
        { question: 'Des visuels en français sont-ils fournis ?', answer: 'Oui — assets FR pour l\'Afrique de l\'Ouest et EN pour les États-Unis.' },
      ],
      cta: 'Rejoindre le programme affilié',
    },
  };
}

export function getPartnershipHubContent(marketCode: MarketCode): PartnershipHubContent {
  const locale = localeForMarket(marketCode);
  const country = countryLabel(marketCode);
  const base = locale === 'en' ? hubEn : hubFr;

  return {
    ...base,
    title:
      locale === 'en'
        ? 'Partnership Programs — Reseller, Referral & Affiliate | ZYVO'
        : `Programme Partenariat ZYVO ${country} — Revendeur, Parrainage & Affilié`,
  };
}

export function getPartnershipProgram(
  marketCode: MarketCode,
  slug: PartnershipProgramSlug
): PartnershipProgram {
  const locale = localeForMarket(marketCode);
  const country = countryLabel(marketCode);
  const programs = locale === 'en' ? buildProgramsEn() : buildProgramsFr(country);
  return programs[slug];
}

export function getAllPartnershipPrograms(marketCode: MarketCode): PartnershipProgram[] {
  const locale = localeForMarket(marketCode);
  const country = countryLabel(marketCode);
  const programs = locale === 'en' ? buildProgramsEn() : buildProgramsFr(country);
  return Object.values(programs);
}
