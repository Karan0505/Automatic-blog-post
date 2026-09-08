import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Clock, Calendar, Sparkles } from 'lucide-react';
import { Post } from '@/types/blog';
import { Image } from '@/components/ui/Image';
import { Button } from '@/components/ui/Button';
import { formatDate } from '@/lib/utils/formatDate';
import { getStrapiMediaUrl } from '@/lib/strapi/media';
import { getDictionary } from '@/lib/i18n/dictionary';

interface BlogHeroProps {
  post: Post;
  buttonText?: string;
  badge?: string;
  locale?: string;
}

export function BlogHero({ post, buttonText, badge, locale = 'en' }: BlogHeroProps) {
  const dict = getDictionary(locale);
  const imageUrl = getStrapiMediaUrl(post.coverImage);
  const authorAvatarUrl = getStrapiMediaUrl(post.author?.avatar);

  const displayBadge = badge || dict.featuredStory;
  const displayButtonText = buttonText || dict.readFullStory;

  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-b from-white/90 via-white/50 to-white/30 dark:from-zinc-900/90 dark:via-zinc-900/50 dark:to-zinc-900/30 p-6 sm:p-10 lg:p-12 backdrop-blur-xl shadow-2xl shadow-indigo-500/5 mb-16">
      {/* Background ambient light */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-violet-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Text Content */}
        <div className="lg:col-span-7 space-y-6">
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-md shadow-indigo-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              {displayBadge}
            </span>
            {post.category && (
              <Link
                href={`/${locale}/category/${post.category.slug}`}
                className="px-3 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors"
              >
                {post.category.name}
              </Link>
            )}
          </div>

          <Link href={`/${locale}/blog/${post.slug}`} className="block group">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.15] group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
              {post.title}
            </h1>
          </Link>

          <p className="text-zinc-600 dark:text-zinc-300 text-sm sm:text-base leading-relaxed line-clamp-3">
            {post.excerpt}
          </p>

          {/* Author & Meta */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-200/80 dark:border-zinc-800/80">
            {post.author && (
              <Link
                href={`/${locale}/author/${post.author.slug}`}
                className="flex items-center gap-3 group/author"
              >
                <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-indigo-500/30">
                  <Image
                    src={authorAvatarUrl}
                    alt={post.author.name}
                    width={40}
                    height={40}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold text-zinc-900 dark:text-white group-hover/author:text-indigo-600 dark:group-hover/author:text-indigo-400 transition-colors">
                    {post.author.name}
                  </h3>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">{post.author.role}</p>
                </div>
              </Link>
            )}

            <div className="flex items-center gap-4 text-xs text-zinc-500 dark:text-zinc-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                {formatDate(post.publishedAt || post.createdAt)}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {post.readingTime || 5} {dict.minRead}
              </span>
            </div>
          </div>

          <div className="pt-2">
            <Link href={`/${locale}/blog/${post.slug}`}>
              <Button variant="primary" size="lg" className="rounded-full shadow-lg shadow-indigo-500/25 group">
                {displayButtonText}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Media / Image Right Side */}
        <div className="lg:col-span-5">
          <Link href={`/${locale}/blog/${post.slug}`} className="block relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-xl group">
            <Image
              src={imageUrl}
              alt={post.title}
              width={600}
              height={450}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
          </Link>
        </div>
      </div>
    </section>
  );
}
