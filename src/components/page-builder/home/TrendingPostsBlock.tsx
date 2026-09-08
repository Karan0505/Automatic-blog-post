import * as React from 'react';
import { Zap } from 'lucide-react';
import { TrendingPostsBlockData } from '@/types/page';
import { Post } from '@/types/blog';
import { BlogCard } from '@/components/blog/BlogCard';

interface TrendingPostsBlockProps {
  block: TrendingPostsBlockData;
  posts?: Post[];
  locale?: string;
}

export function TrendingPostsBlock({ block, posts = [], locale = 'en' }: TrendingPostsBlockProps) {
  const trending = posts.filter((p) => p.trending);
  const displayPosts = (trending.length > 0 ? trending : posts).slice(0, block.limit || 2);

  if (displayPosts.length === 0) return null;

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 flex items-center justify-center text-amber-500">
            <Zap className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {block.title || 'Trending Insights'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              {block.subtitle || 'Most engaging engineering blueprints and architectural patterns'}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {displayPosts.map((post) => (
          <BlogCard key={post.id} post={post} locale={locale} />
        ))}
      </div>
    </section>
  );
}
