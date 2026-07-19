'use client';

import Link from 'next/link';
import WhatsAppButton from '@/components/markets/WhatsAppButton';
import type { ProgrammaticPageRow } from '@/lib/ai/db/schema';

interface Props {
  page: ProgrammaticPageRow;
  countryCode: string;
}

export default function MarketProgrammaticPage({ page, countryCode }: Props) {
  const content = (page.content as string[]) ?? [];
  const faq = (page.faq as { question: string; answer: string }[]) ?? [];

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <nav className="text-sm text-gray-500 mb-6">
        <Link href={`/${countryCode}`} className="hover:text-brand-primary">Accueil</Link>
        <span className="mx-2">/</span>
        <span>{page.title}</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold mb-6">{page.headline}</h1>

      <div className="prose prose-lg max-w-none mb-12">
        {content.map((paragraph, i) => (
          <p key={i} className="mb-4 text-gray-700">{paragraph}</p>
        ))}
      </div>

      {faq.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">FAQ</h2>
          <div className="space-y-4">
            {faq.map((item, i) => (
              <details key={i} className="border rounded-lg p-4">
                <summary className="font-semibold cursor-pointer">{item.question}</summary>
                <p className="mt-3 text-gray-600">{item.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <div className="bg-brand-primary text-white rounded-xl p-8 text-center space-y-4">
        <p className="text-lg">{page.cta}</p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link
            href={`/${countryCode}/demo`}
            className="inline-block px-6 py-3 bg-white text-brand-primary font-semibold rounded-lg hover:bg-gray-100"
          >
            Demander une démo
          </Link>
          <WhatsAppButton variant="onPrimary" placement="programmatic_erp_cta" label="WhatsApp" />
        </div>
      </div>
    </div>
  );
}
