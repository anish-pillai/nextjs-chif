import React from 'react';
import { SiteConfig } from '@/lib/site-config';

interface HeroSectionProps {
  title: string;
  description: string;
  siteConfig?: SiteConfig;
  reducedHeight?: boolean;
}

export function HeroSection({ title, description, siteConfig, reducedHeight = false }: HeroSectionProps) {
  const heightClass = reducedHeight ? 'py-12' : 'py-20';
  
  return (
    <section className={`bg-primary-50 dark:bg-gray-800 ${heightClass}`}>
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-6 text-gray-900 dark:text-white">
          {title}
        </h1>
        <p className="text-xl text-center text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {description}
        </p>
      </div>
    </section>
  );
}
