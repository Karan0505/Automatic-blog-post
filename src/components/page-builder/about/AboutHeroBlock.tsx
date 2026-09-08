import * as React from 'react';
import { Compass } from 'lucide-react';
import { AboutHeroBlockData } from '@/types/page';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

interface AboutHeroBlockProps {
  block: AboutHeroBlockData;
}

export function AboutHeroBlock({ block }: AboutHeroBlockProps) {
  const badge = block.badge || 'Our Mission & Vision';
  const title = block.title || 'Bridging Software Architecture & Design Craft';
  const description =
    block.description ||
    'Chronicle was founded to elevate technical writing into thoughtful, durable engineering artifacts. We unpack modern headless web architecture, design system engineering, and developer ergonomics.';

  return (
    <section className="text-center space-y-6 py-6 max-w-3xl mx-auto">
      <div className="w-16 h-16 rounded-3xl bg-indigo-600/10 border border-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto shadow-lg shadow-indigo-500/10">
        <DynamicIcon name={block.icon} fallback={Compass} className="w-8 h-8" />
      </div>

      <div className="space-y-3">
        {badge && (
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
            {badge}
          </span>
        )}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
          {title}
        </h1>
      </div>

      {description && (
        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
      )}
    </section>
  );
}
