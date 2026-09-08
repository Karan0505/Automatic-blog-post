import * as React from 'react';
import Link from 'next/link';
import { Zap } from 'lucide-react';
import { FeatureCardsBlockData } from '@/types/page';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

interface FeatureCardsBlockProps {
  block: FeatureCardsBlockData;
}

export function FeatureCardsBlock({ block }: FeatureCardsBlockProps) {
  const cards = block.cards || [];
  if (cards.length === 0) return null;

  return (
    <section className="space-y-8">
      {(block.title || block.subtitle) && (
        <div className="text-center max-w-2xl mx-auto space-y-3">
          {block.title && (
            <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {block.title}
            </h2>
          )}
          {block.subtitle && (
            <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400">
              {block.subtitle}
            </p>
          )}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, idx) => {
          const CardContent = (
            <div className="group relative h-full rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-500/30">
              <div className="w-12 h-12 rounded-xl bg-indigo-500/10 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mb-5 group-hover:scale-110 transition-transform">
                <DynamicIcon name={card.icon} fallback={Zap} className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white mb-2">
                {card.title}
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                {card.description}
              </p>
            </div>
          );

          if (card.link) {
            return (
              <Link key={idx} href={card.link} className="block h-full">
                {CardContent}
              </Link>
            );
          }

          return <div key={idx}>{CardContent}</div>;
        })}
      </div>
    </section>
  );
}
