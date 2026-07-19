'use client';

import Link from 'next/link';
import type { ComponentProps } from 'react';
import { useMarket } from '@/contexts/market-context';

type LocalizedLinkProps = Omit<ComponentProps<typeof Link>, 'href'> & {
  href: string;
};

export default function LocalizedLink({ href, ...props }: LocalizedLinkProps) {
  const { localizedHref } = useMarket();
  return <Link href={localizedHref(href)} {...props} />;
}
