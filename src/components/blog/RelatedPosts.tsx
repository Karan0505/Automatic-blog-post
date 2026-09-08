import * as React from 'react';
import { Post } from '@/types/blog';
import { BlogCard } from './BlogCard';
import { Sparkles } from 'lucide-react';

interface RelatedPostsProps {
  posts: Post[];
  locale?: string;
}

export function RelatedPosts({ posts, locale = 'en' }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-20 pt-12 border-t border-zinc-200 dark:border-zinc-800">
      <div className="flex items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
          <Sparkles className="w-4 h-4" />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
            Related Stories
          </h2>
          <p className="text-xs text-zinc-500">More perspectives from this collection</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} locale={locale} />
        ))}
      </div>
    </section>
  );
}
