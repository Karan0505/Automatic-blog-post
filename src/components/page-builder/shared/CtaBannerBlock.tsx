import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import { CtaBannerBlockData } from '@/types/page';
import { Button } from '@/components/ui/Button';

interface CtaBannerBlockProps {
  block: CtaBannerBlockData;
}

export function CtaBannerBlock({ block }: CtaBannerBlockProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-br from-indigo-50/50 via-white to-violet-50/30 dark:from-zinc-900/90 dark:via-zinc-900/50 dark:to-zinc-950 p-8 sm:p-12 shadow-xl backdrop-blur-xl">
      <div className="max-w-3xl space-y-5">
        {block.badge && (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-xs font-bold">
            <Sparkles className="w-3.5 h-3.5" />
            {block.badge}
          </span>
        )}
        <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {block.title}
        </h2>
        {block.description && (
          <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed">
            {block.description}
          </p>
        )}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          {block.primaryButtonText && (
            <Link href={block.primaryButtonLink || '#'}>
              <Button variant="primary" size="md" className="rounded-xl font-bold">
                {block.primaryButtonText} <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
            </Link>
          )}
          {block.secondaryButtonText && (
            <Link href={block.secondaryButtonLink || '#'}>
              <Button variant="outline" size="md" className="rounded-xl font-semibold">
                {block.secondaryButtonText}
              </Button>
            </Link>
          )}
        </div>
      </div>
    </section>
  );
}
