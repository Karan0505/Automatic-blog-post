import * as React from 'react';
import { BookOpen } from 'lucide-react';
import { ArticlesHeaderBlockData } from '@/types/page';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

interface ArticlesHeaderBlockProps {
  block: ArticlesHeaderBlockData;
}

export function ArticlesHeaderBlock({ block }: ArticlesHeaderBlockProps) {
  const badge = block.badge || 'Publication Archive';
  const title = block.title || 'Articles & Insights';
  const description =
    block.description ||
    'In-depth perspectives, architectural case studies, and engineering tutorials authored by practitioners.';

  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-b from-white/90 via-white/50 to-white/30 dark:from-zinc-900/90 dark:via-zinc-900/50 dark:to-zinc-900/30 p-8 sm:p-12 backdrop-blur-xl shadow-lg">
      <div className="max-w-2xl space-y-4">
        {badge && (
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400 shadow-sm">
            <DynamicIcon name={block.icon} fallback={BookOpen} className="w-3.5 h-3.5" />
            {badge}
          </div>
        )}
        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {title}
        </h1>
        {description && (
          <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}
