'use client';

import { Check } from 'lucide-react';
import ProductScreenshot from './ProductScreenshot';
import ModuleGallery from './ModuleGallery';
import type { ModuleImageSet } from '@/data/module-images';

interface ModuleDetailShowcaseProps {
  title: string;
  subtitle: string;
  benefits: string[];
  images: ModuleImageSet;
  imagePosition?: 'left' | 'right';
}

export function ModuleDetailShowcase({
  title,
  subtitle,
  benefits,
  images,
  imagePosition = 'right',
}: ModuleDetailShowcaseProps) {
  const content = (
    <div className="flex flex-col justify-center">
      <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-4">
        {title}
      </h2>
      <p className="text-lg text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">{subtitle}</p>
      <ul className="space-y-3">
        {benefits.slice(0, 4).map((benefit) => (
          <li key={benefit} className="flex items-start gap-3 text-gray-700 dark:text-gray-300">
            <Check className="w-5 h-5 text-brand-accent mt-0.5 shrink-0" aria-hidden="true" />
            {benefit}
          </li>
        ))}
      </ul>
    </div>
  );

  const visual = <ModuleGallery images={images} priority={imagePosition === 'right'} />;

  return (
    <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
      {imagePosition === 'left' ? (
        <>
          {visual}
          {content}
        </>
      ) : (
        <>
          {content}
          {visual}
        </>
      )}
    </div>
  );
}

interface ModuleHeroScreenshotProps {
  images: ModuleImageSet;
  priority?: boolean;
}

export function ModuleHeroScreenshot({ images, priority = true }: ModuleHeroScreenshotProps) {
  return (
    <div className="relative">
      <ProductScreenshot src={images.hero} alt={images.alt} variant="hero" priority={priority} />
    </div>
  );
}
