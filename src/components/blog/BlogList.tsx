import * as React from 'react';
import { Post } from '@/types/blog';
import { BlogCard } from './BlogCard';

interface BlogListProps {
  posts: Post[];
}

export function BlogList({ posts }: BlogListProps) {
  if (posts.length === 0) {
    return (
      <div className="text-center py-16 border border-dashed border-zinc-300 dark:border-zinc-800 rounded-3xl p-8">
        <p className="text-zinc-500 dark:text-zinc-400">No articles available.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {posts.map((post) => (
        <BlogCard key={post.id} post={post} variant="horizontal" />
      ))}
    </div>
  );
}
