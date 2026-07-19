'use client';

import { useState } from 'react';
import { Check, Link2, Share2 } from 'lucide-react';

interface BlogShareButtonsProps {
  url: string;
  title: string;
  shareLabel: string;
}

export default function BlogShareButtons({ url, title, shareLabel }: BlogShareButtonsProps) {
  const [copied, setCopied] = useState(false);
  const encoded = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  const shares = [
    {
      name: 'WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encoded}`,
      className: 'hover:bg-green-50 hover:text-green-700 hover:border-green-200',
    },
    {
      name: 'LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
      className: 'hover:bg-blue-50 hover:text-blue-700 hover:border-blue-200',
    },
    {
      name: 'X',
      href: `https://twitter.com/intent/tweet?url=${encoded}&text=${encodedTitle}`,
      className: 'hover:bg-gray-100 hover:text-gray-900',
    },
  ];

  return (
    <div className="flex flex-wrap items-center gap-3">
      <span className="flex items-center gap-1.5 text-sm font-medium text-gray-500 dark:text-gray-400">
        <Share2 className="w-4 h-4" />
        {shareLabel}
      </span>
      {shares.map((s) => (
        <a
          key={s.name}
          href={s.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`px-3 py-1.5 text-xs font-medium border border-gray-200 dark:border-gray-700 rounded-lg transition-colors ${s.className}`}
        >
          {s.name}
        </a>
      ))}
      <button
        type="button"
        onClick={copyLink}
        className="px-3 py-1.5 text-xs font-medium border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors inline-flex items-center gap-1.5"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-green-600" /> : <Link2 className="w-3.5 h-3.5" />}
        {copied ? 'Copié !' : 'Copier le lien'}
      </button>
    </div>
  );
}
