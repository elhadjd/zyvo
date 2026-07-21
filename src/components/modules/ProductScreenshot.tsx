'use client';

import { useState } from 'react';
import Image from 'next/image';

export type ScreenshotVariant = 'hero' | 'card' | 'compact' | 'gallery';

interface ProductScreenshotProps {
  src: string;
  alt: string;
  variant?: ScreenshotVariant;
  priority?: boolean;
  className?: string;
  caption?: string;
}

const variantStyles: Record<ScreenshotVariant, string> = {
  hero: 'rounded-2xl shadow-2xl shadow-brand-primary/10',
  card: 'rounded-xl shadow-lg',
  compact: 'rounded-lg shadow-md',
  gallery: 'rounded-xl shadow-xl',
};

export default function ProductScreenshot({
  src,
  alt,
  variant = 'hero',
  priority = false,
  className,
  caption,
}: ProductScreenshotProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <figure className={`group relative ${className ?? ''}`}>
      {/* Ambient glow */}
      <div
        className="absolute -inset-4 bg-gradient-to-br from-brand-primary/20 via-brand-accent/10 to-transparent rounded-3xl blur-2xl opacity-60 group-hover:opacity-80 transition-opacity duration-500 pointer-events-none"
        aria-hidden="true"
      />

      <div
        className={`relative overflow-hidden border border-gray-200/80 dark:border-gray-700/80 bg-gray-100 dark:bg-gray-800 ${variantStyles[variant]}`}
      >
        {/* Browser chrome */}
        <div className="flex items-center gap-2 px-4 py-2.5 bg-gray-50 dark:bg-gray-900 border-b border-gray-200/80 dark:border-gray-700/80">
          <div className="flex gap-1.5" aria-hidden="true">
            <span className="w-2.5 h-2.5 rounded-full bg-red-400/90" />
            <span className="w-2.5 h-2.5 rounded-full bg-amber-400/90" />
            <span className="w-2.5 h-2.5 rounded-full bg-green-400/90" />
          </div>
          <div className="flex-1 mx-2">
            <div className="h-5 max-w-[200px] mx-auto rounded-md bg-gray-200/80 dark:bg-gray-700/80 text-[10px] text-gray-400 dark:text-gray-500 flex items-center justify-center truncate px-2">
              app.zyvoerp.com
            </div>
          </div>
        </div>

        {/* Screenshot */}
        <div className="relative aspect-[16/10] bg-gradient-to-br from-slate-100 to-slate-200 dark:from-gray-800 dark:to-gray-900">
          {!loaded && (
            <div className="absolute inset-0 animate-pulse bg-gray-200 dark:bg-gray-700" aria-hidden="true" />
          )}
          <Image
            src={src}
            alt={alt}
            title={alt}
            fill
            sizes={
              variant === 'hero'
                ? '(max-width: 768px) 100vw, 50vw'
                : variant === 'card'
                  ? '(max-width: 768px) 100vw, 33vw'
                  : '400px'
            }
            className={`object-cover object-top transition-all duration-700 ${
              loaded ? 'opacity-100 scale-100' : 'opacity-0 scale-[1.02]'
            } group-hover:scale-[1.01]`}
            priority={priority}
            onLoad={() => setLoaded(true)}
          />
        </div>
      </div>

      {caption && (
        <figcaption className="mt-3 text-center text-xs text-gray-500 dark:text-gray-400">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
