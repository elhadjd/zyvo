'use client';

import { usePathname } from 'next/navigation';
import { MessageCircle } from 'lucide-react';
import { useMarket } from '@/contexts/market-context';
import { parseMarketFromPathname } from '@/lib/markets/routing';
import { buildWhatsAppUrl, trackWhatsAppClick } from '@/lib/markets/whatsapp';

export default function FloatingWhatsApp() {
  const { market, marketCode, isDefaultMarket } = useMarket();
  const pathname = usePathname();

  if (isDefaultMarket && !pathname.match(/^\/(gn|sn|ci)(\/|$)/)) {
    return null;
  }

  const code = marketCode !== 'us' ? marketCode : parseMarketFromPathname(pathname);
  if (!['gn', 'sn', 'ci'].includes(code)) return null;

  const href = buildWhatsAppUrl({
    marketCode: code,
    placement: 'floating_button',
    message: `Bonjour, je souhaite en savoir plus sur ZYVO en ${market.countryNameLocal}.`,
  });

  if (!href) return null;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => void trackWhatsAppClick(code, pathname, 'floating_button')}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1fb855] hover:scale-105 transition-all"
      aria-label="Contacter ZYVO sur WhatsApp"
    >
      <MessageCircle className="w-7 h-7" aria-hidden="true" />
    </a>
  );
}
