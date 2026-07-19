import type { MarketCode } from '@/lib/markets/types';
import { getMarket } from '@/lib/markets/registry';

export interface WhatsAppLinkOptions {
  marketCode: MarketCode;
  placement: string;
  message?: string;
}

export function buildWhatsAppUrl({ marketCode, placement, message }: WhatsAppLinkOptions): string | null {
  const market = getMarket(marketCode);
  const phone = market.contact.whatsapp?.replace(/\D/g, '');
  if (!phone) return null;

  const defaultMessage =
    message ??
    `Bonjour, je souhaite essayer ZYVO pour mon entreprise en ${market.countryNameLocal}. Pouvez-vous m'aider ?`;

  const params = new URLSearchParams({
    text: defaultMessage,
  });

  // UTM for attribution in WhatsApp analytics
  params.set('utm_source', 'zyvo_site');
  params.set('utm_medium', 'whatsapp');
  params.set('utm_campaign', marketCode);
  params.set('utm_content', placement);

  return `https://wa.me/${phone}?${params.toString()}`;
}

export async function trackWhatsAppClick(
  marketCode: MarketCode,
  page: string,
  placement: string
): Promise<void> {
  try {
    await fetch('/api/analytics/conversion', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        userAction: 'whatsapp_contact',
        country: marketCode,
        page,
        source: `whatsapp_${placement}`,
        metadata: { placement },
      }),
    });
  } catch {
    // Non-blocking
  }
}
