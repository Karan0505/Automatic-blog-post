import * as React from 'react';
import { Post } from '@/types/blog';
import { BlogCard } from './BlogCard';

interface BlogGridProps {
  posts: Post[];
  columns?: 2 | 3;
  locale?: string;
}

export function BlogGrid({ posts, columns = 3, locale = 'en' }: BlogGridProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-3xl p-8">
        <p className="text-zinc-500 dark:text-zinc-400">No articles available.</p>
      </div>
    );
  }

  const gridClass =
    columns === 2
      ? 'grid grid-cols-1 md:grid-cols-2 gap-8'
      : 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';

  return (
    <div className={gridClass}>
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} locale={locale} />
      ))}
    </div>
  );
}
