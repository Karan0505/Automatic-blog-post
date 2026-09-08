'use client';

import * as React from 'react';
import { Post } from '@/types/blog';
import { BlogCard } from '@/components/blog/BlogCard';
import { AlertCircle } from 'lucide-react';

interface SearchResultsProps {
  posts: Post[];
  query: string;
  isLoading?: boolean;
  locale?: string;
}

export function SearchResults({ posts, query, isLoading = false, locale = 'en' }: SearchResultsProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="h-80 rounded-2xl bg-zinc-100 dark:bg-zinc-800/50 animate-pulse"
          />
        ))}
      </div>
    );
  }

  if (query && posts.length === 0) {
    return (
      <div className="text-center py-16 px-4 space-y-4">
        <div className="w-14 h-14 rounded-2xl bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center mx-auto text-zinc-400">
          <AlertCircle className="w-7 h-7" />
        </div>
        <h3 className="text-lg font-bold text-zinc-900 dark:text-white">
          No matching articles found
        </h3>
        <p className="text-sm text-zinc-500 max-w-md mx-auto">
          We couldn&apos;t find any stories matching &ldquo;{query}&rdquo;. Try searching for keywords like &ldquo;Next.js&rdquo;, &ldquo;Strapi&rdquo;, or &ldquo;Architecture&rdquo;.
        </p>
      </div>
    );
  }

  if (!query) {
    return (
      <div className="text-center py-12 text-zinc-400 text-sm">
        Type a keyword above to search through our entire editorial archive.
      </div>
    );
  }

  return (
    <div className="space-y-6 pt-6">
      <div className="flex items-center justify-between text-xs text-zinc-500 border-b border-zinc-200 dark:border-zinc-800 pb-3">
        <span>
          Found <strong className="text-zinc-900 dark:text-white">{posts.length}</strong> {posts.length === 1 ? 'result' : 'results'} for &ldquo;{query}&rdquo;
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} locale={locale} />
        ))}
      </div>
    </div>
  );
}
