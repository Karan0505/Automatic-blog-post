import * as React from 'react';
import Link from 'next/link';
import { Layers, ArrowRight } from 'lucide-react';
import { TopicsGridBlockData } from '@/types/page';
import { Category } from '@/types/category';
import { CategoryCard } from '@/components/category/CategoryCard';
import { Button } from '@/components/ui/Button';

interface TopicsGridBlockProps {
  block: TopicsGridBlockData;
  categories?: Category[];
  locale?: string;
}

export function TopicsGridBlock({ block, categories = [], locale = 'en' }: TopicsGridBlockProps) {
  if (categories.length === 0) return null;

  const limit = block.limit || 4;
  const displayedCategories = categories.slice(0, limit);

  const viewAllLink = block.viewAllLink
    ? (block.viewAllLink.startsWith(`/${locale}`) ? block.viewAllLink : `/${locale}${block.viewAllLink.startsWith('/') ? block.viewAllLink : `/${block.viewAllLink}`}`)
    : `/${locale}/blog`;

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {block.title || 'Explore Core Topics'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              {block.subtitle || 'Curated collections across software architecture and engineering'}
            </p>
          </div>
        </div>
        <Link href={viewAllLink} className="hidden sm:inline-flex">
          <Button variant="ghost" size="sm" className="text-xs font-bold gap-1 text-indigo-600 dark:text-indigo-400">
            {block.viewAllText || 'View All Topics'} <ArrowRight className="w-3.5 h-3.5" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {displayedCategories.map((cat) => (
          <CategoryCard key={cat.id} category={cat} locale={locale} />
        ))}
      </div>
    </section>
  );
}
