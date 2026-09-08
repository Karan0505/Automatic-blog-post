import * as React from 'react';
import { Users } from 'lucide-react';
import { FeaturedAuthorsBlockData } from '@/types/page';
import { Author } from '@/types/author';
import { AuthorCard } from '@/components/author/AuthorCard';

interface FeaturedAuthorsBlockProps {
  block: FeaturedAuthorsBlockData;
  authors?: Author[];
  locale?: string;
}

export function FeaturedAuthorsBlock({ block, authors = [], locale = 'en' }: FeaturedAuthorsBlockProps) {
  if (authors.length === 0) return null;

  const limit = block.limit || 3;
  const displayAuthors = authors.slice(0, limit);

  return (
    <section className="space-y-8 pt-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-2xl bg-violet-500/10 flex items-center justify-center text-violet-500">
          <Users className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
            {block.title || 'Featured Contributors'}
          </h2>
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
            {block.subtitle || 'Written by seasoned engineers, tech leads, and systems designers'}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {displayAuthors.map((author) => (
          <AuthorCard key={author.id} author={author} locale={locale} />
        ))}
      </div>
    </section>
  );
}
