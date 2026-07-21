'use client';

import { useState } from 'react';
import ProductScreenshot from './ProductScreenshot';
import type { ModuleImageSet } from '@/data/module-images';

interface ModuleGalleryProps {
  images: ModuleImageSet;
  priority?: boolean;
}

export default function ModuleGallery({ images, priority = false }: ModuleGalleryProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const gallery = images.gallery.length > 0 ? images.gallery : [images.hero];
  const activeSrc = gallery[activeIndex] ?? images.hero;

  return (
    <div className="space-y-4">
      <ProductScreenshot
        src={activeSrc}
        alt={images.alt}
        variant="gallery"
        priority={priority}
      />

      {gallery.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {gallery.map((src, index) => (
            <button
              key={src}
              type="button"
              onClick={() => setActiveIndex(index)}
              className={`relative shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                index === activeIndex
                  ? 'border-brand-primary dark:border-brand-accent ring-2 ring-brand-primary/20'
                  : 'border-gray-200 dark:border-gray-700 opacity-70 hover:opacity-100'
              }`}
              aria-label={`Screenshot ${index + 1}`}
              aria-current={index === activeIndex ? 'true' : undefined}
            >
              <img
                src={src}
                alt={`${images.alt} — preview ${index + 1}`}
                title={`${images.alt} — preview ${index + 1}`}
                className="w-full h-full object-cover object-top"
                loading="lazy"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
