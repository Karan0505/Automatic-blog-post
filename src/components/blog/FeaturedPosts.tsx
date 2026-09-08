import * as React from 'react';
import { Post } from '@/types/blog';
import { BlogCard } from './BlogCard';
import { Flame } from 'lucide-react';

interface FeaturedPostsProps {
  posts: Post[];
  title?: string;
  subtitle?: string;
}

export function FeaturedPosts({
  posts,
  title = 'Trending Articles',
  subtitle = 'Most read insights across technology and design',
}: FeaturedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mb-16">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
            <Flame className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {title}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">{subtitle}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </section>
  );
}
