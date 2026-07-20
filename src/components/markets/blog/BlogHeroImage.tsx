'use client';

import { useState } from 'react';
import { getHeroImageFallbackUrl } from '@/lib/ai/services/stock-image-library';

interface BlogHeroImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'eager' | 'lazy';
  fetchPriority?: 'high' | 'low' | 'auto';
  width?: number;
  height?: number;
}

export default function BlogHeroImage({
  src,
  alt,
  className,
  loading = 'lazy',
  fetchPriority,
  width,
  height,
}: BlogHeroImageProps) {
  const [currentSrc, setCurrentSrc] = useState(src);

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={currentSrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      fetchPriority={fetchPriority}
      onError={() => {
        const fallback = getHeroImageFallbackUrl();
        if (currentSrc !== fallback) {
          setCurrentSrc(fallback);
        }
      }}
    />
  );
}
