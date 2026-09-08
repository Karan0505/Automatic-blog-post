import * as React from 'react';
import Link from 'next/link';
import { Clock, Calendar, ArrowUpRight } from 'lucide-react';
import { Post } from '@/types/blog';
import { Image } from '@/components/ui/Image';
import { formatDate } from '@/lib/utils/formatDate';
import { getStrapiMediaUrl } from '@/lib/strapi/media';

interface BlogCardProps {
  post: Post;
  variant?: 'standard' | 'compact' | 'horizontal';
  locale?: string;
}

export function BlogCard({ post, variant = 'standard', locale = 'en' }: BlogCardProps) {
  const imageUrl = getStrapiMediaUrl(post.coverImage);
  const authorAvatarUrl = getStrapiMediaUrl(post.author?.avatar);


  if (variant === 'horizontal') {
    return (
      <article className="group relative rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 p-4 sm:p-5 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 flex flex-col sm:flex-row gap-5 items-start">
        <div className="w-full sm:w-48 h-44 rounded-xl overflow-hidden shrink-0">
          <Image
            src={imageUrl}
            alt={post.title}
            width={400}
            height={250}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        </div>

        <div className="flex-1 flex flex-col justify-between h-full space-y-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2.5 text-xs">
              {post.category && (
                <Link
                  href={`/${locale}/category/${post.category.slug}`}
                  className="font-semibold px-2.5 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors"
                >
                  {post.category.name}
                </Link>
              )}
              <span className="text-zinc-400">•</span>
              <span className="text-zinc-400 flex items-center gap-1">
                <Clock className="w-3 h-3" />
                {post.readingTime || 5} min read
              </span>
            </div>

            <Link href={`/${locale}/blog/${post.slug}`}>
              <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors leading-snug line-clamp-2">
                {post.title}
              </h3>
            </Link>

            <p className="text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
              {post.excerpt}
            </p>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-zinc-100 dark:border-zinc-800/60 text-xs">
            {post.author && (
              <Link
                href={`/${locale}/author/${post.author.slug}`}
                className="flex items-center gap-2 text-zinc-700 dark:text-zinc-300 hover:text-indigo-600 dark:hover:text-indigo-400 font-medium"
              >
                <div className="w-5 h-5 rounded-full overflow-hidden">
                  <Image
                    src={authorAvatarUrl}
                    alt={post.author.name}
                    width={20}
                    height={20}
                    className="w-full h-full object-cover"
                  />
                </div>
                <span>{post.author.name}</span>
              </Link>
            )}
            <span className="text-zinc-400">{formatDate(post.publishedAt || post.createdAt)}</span>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article className="group relative rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 overflow-hidden backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 flex flex-col">
      {/* Cover Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden">
        <Image
          src={imageUrl}
          alt={post.title}
          width={600}
          height={380}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {post.category && (
          <div className="absolute top-3.5 left-3.5 z-10">
            <Link
              href={`/${locale}/category/${post.category.slug}`}
              className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-white/90 dark:bg-zinc-900/90 text-zinc-900 dark:text-white backdrop-blur-md shadow-sm hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-500 transition-colors"
            >
              {post.category.name}
            </Link>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        <div className="space-y-2.5">
          <div className="flex items-center gap-3 text-xs text-zinc-500 dark:text-zinc-400">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.publishedAt || post.createdAt)}
            </span>
            <span>•</span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              {post.readingTime || 5} min read
            </span>
          </div>

          <Link href={`/${locale}/blog/${post.slug}`} className="block group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            <h3 className="text-xl font-bold text-zinc-900 dark:text-white leading-tight line-clamp-2">
              {post.title}
            </h3>
          </Link>

          <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400 line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>
        </div>

        {/* Footer info: Author */}
        <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
          {post.author ? (
            <Link
              href={`/${locale}/author/${post.author.slug}`}
              className="flex items-center gap-2.5 group/author"
            >
              <div className="w-7 h-7 rounded-full overflow-hidden ring-1 ring-zinc-200 dark:ring-zinc-700">
                <Image
                  src={authorAvatarUrl}
                  alt={post.author.name}
                  width={28}
                  height={28}
                  className="w-full h-full object-cover"
                />
              </div>
              <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-200 group-hover/author:text-indigo-600 dark:group-hover/author:text-indigo-400 transition-colors">
                {post.author.name}
              </span>
            </Link>
          ) : (
            <div />
          )}

          <Link
            href={`/${locale}/blog/${post.slug}`}
            className="w-8 h-8 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center text-zinc-500 dark:text-zinc-400 group-hover:bg-indigo-600 group-hover:text-white transition-all"
            aria-label={`Read ${post.title}`}
          >
            <ArrowUpRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
