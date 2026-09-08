import * as React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { LatestPostsBlockData } from '@/types/page';
import { Post } from '@/types/blog';
import { BlogCard } from '@/components/blog/BlogCard';
import { Button } from '@/components/ui/Button';

interface LatestPostsBlockProps {
  block: LatestPostsBlockData;
  posts?: Post[];
  locale?: string;
}

export function LatestPostsBlock({ block, posts = [], locale = 'en' }: LatestPostsBlockProps) {
  if (posts.length === 0) return null;

  const limit = block.limit || 6;
  const displayPosts = posts.slice(0, limit);

  const archiveLink = block.browseArchiveLink
    ? (block.browseArchiveLink.startsWith(`/${locale}`) ? block.browseArchiveLink : `/${locale}${block.browseArchiveLink.startsWith('/') ? block.browseArchiveLink : `/${block.browseArchiveLink}`}`)
    : `/${locale}/blog`;

  return (
    <section className="space-y-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {block.title || 'Latest Publications'}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400">
              {block.subtitle || 'Freshly released technical essays and development guides'}
            </p>
          </div>
        </div>
        <Link href={archiveLink}>
          <Button variant="outline" size="sm" className="rounded-xl text-xs font-semibold">
            {block.browseArchiveText || 'Browse Archive'} <ArrowRight className="w-3.5 h-3.5 ml-1" />
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {displayPosts.map((post) => (
          <BlogCard key={post.id} post={post} locale={locale} />
        ))}
      </div>
    </section>
  );
}
