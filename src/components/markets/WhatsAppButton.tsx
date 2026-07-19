'use client';

import { MessageCircle } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { useMarket } from '@/contexts/market-context';
import { buildWhatsAppUrl, trackWhatsAppClick } from '@/lib/markets/whatsapp';
import { parseMarketFromPathname } from '@/lib/markets/routing';

interface WhatsAppButtonProps {
  placement: string;
  label?: string;
  message?: string;
  variant?: 'primary' | 'outline' | 'onPrimary' | 'inline';
  className?: string;
}

const variantClasses: Record<NonNullable<WhatsAppButtonProps['variant']>, string> = {
  primary:
    'inline-flex items-center gap-2 px-6 py-3.5 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#1fb855] transition-colors min-h-[48px]',
  outline:
    'inline-flex items-center gap-2 px-6 py-3.5 border-2 border-[#25D366] text-[#25D366] dark:text-[#25D366] font-semibold rounded-lg hover:bg-[#25D366]/10 transition-colors min-h-[48px]',
  onPrimary:
    'inline-flex items-center gap-2 px-6 py-3 bg-[#25D366] text-white font-semibold rounded-lg hover:bg-[#1fb855] transition-colors',
  inline:
    'inline-flex items-center gap-3 text-white/90 hover:text-white transition-colors',
};

export default function WhatsAppButton({
  placement,
  label = 'WhatsApp',
  message,
  variant = 'primary',
  className = '',
}: WhatsAppButtonProps) {
  const { marketCode } = useMarket();
  const pathname = usePathname();
  const code = marketCode !== 'us' ? marketCode : parseMarketFromPathname(pathname);

  const href = buildWhatsAppUrl({ marketCode: code, placement, message });
  if (!href) return null;

  const handleClick = () => {
    void trackWhatsAppClick(code, pathname, placement);
  };

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onClick={handleClick}
      className={`${variantClasses[variant]} ${className}`}
    >
      <MessageCircle className="w-5 h-5" aria-hidden="true" />
      {label}
    </a>
  );
}
