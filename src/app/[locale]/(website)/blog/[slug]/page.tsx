import * as React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import {
  Calendar,
  Clock,
  ArrowLeft,
  Tag as TagIcon,
} from 'lucide-react';

import { getPostBySlug, getRelatedPosts } from '@/lib/strapi/posts';
import { getStrapiMediaUrl } from '@/lib/strapi/media';
import { formatDate } from '@/lib/utils/formatDate';
import { Image } from '@/components/ui/Image';
import { BlogContent } from '@/components/blog/BlogContent';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { AuthorCard } from '@/components/author/AuthorCard';
import { JsonLd } from '@/components/seo/JsonLd';
import { SITE_CONFIG } from '@/lib/constants';
import { TableOfContentsItem } from '@/types/blog';

interface SingleBlogPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
}

export async function generateMetadata({ params }: SingleBlogPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    return {
      title: 'Article Not Found',
    };
  }

  const imageUrl = getStrapiMediaUrl(post.coverImage, SITE_CONFIG.ogImage);

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    openGraph: {
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt || post.createdAt,
      authors: post.author?.name ? [post.author.name] : undefined,
      images: [{ url: imageUrl }],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seo?.metaTitle || post.title,
      description: post.seo?.metaDescription || post.excerpt,
      images: [imageUrl],
    },
  };
}

function extractTableOfContents(content: string): TableOfContentsItem[] {
  if (!content) return [];
  const headingMatches = content.matchAll(/^(#{2,3})\s+(.+)$/gm);
  const items: TableOfContentsItem[] = [];
  for (const match of headingMatches) {
    const level = match[1].length;
    const rawTitle = match[2].trim();
    const title = rawTitle
      .replace(/\*\*(.*?)\*\*/g, '$1')
      .replace(/\*(.*?)\*/g, '$1')
      .replace(/`(.*?)`/g, '$1')
      .trim();
    const anchor = title
      .toLowerCase()
      .replace(/[—–]/g, '-')
      .replace(/[^\w\s-]/g, '')
      .trim()
      .replace(/[\s_-]+/g, '-');
    items.push({
      title,
      anchor,
      level,
    });
  }
  return items;
}

export const revalidate = 10;

export default async function SingleBlogPage({ params }: SingleBlogPageProps) {
  const { slug, locale } = await params;
  const post = await getPostBySlug(slug, locale);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.category?.slug, post.id, 3, locale);
  const imageUrl = getStrapiMediaUrl(post.coverImage);
  const authorAvatarUrl = getStrapiMediaUrl(post.author?.avatar);

  const tocItems =
    post.tableOfContents && post.tableOfContents.length > 0
      ? post.tableOfContents
      : extractTableOfContents(post.content);
  const hasToc = tocItems && tocItems.length > 0;

  return (
    <article className="max-w-4xl mx-auto space-y-10">
      <JsonLd post={post} />

      {/* Back Button & Breadcrumbs */}
      <div className="flex items-center justify-between text-xs text-zinc-500">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-1.5 font-medium hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles
        </Link>
        {post.category && (
          <Link
            href={`/${locale}/category/${post.category.slug}`}
            className="px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 font-semibold text-indigo-600 dark:text-indigo-400 hover:bg-indigo-100 transition-colors"
          >
            {post.category.name}
          </Link>
        )}
      </div>
fgfd
      {/* Article Header */}
      <header className="space-y-6">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-[1.15]">
          {post.title}
        </h1>

        <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-300 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Author Byline & Metrics */}
        <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-zinc-200 dark:border-zinc-800">
          {post.author && (
            <Link
              href={`/${locale}/author/${post.author.slug}`}
              className="flex items-center gap-3 group/author"
            >
              <div className="w-11 h-11 rounded-full overflow-hidden ring-2 ring-indigo-500/20">
                <Image
                  src={authorAvatarUrl}
                  alt={post.author.name}
                  width={44}
                  height={44}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-zinc-900 dark:text-white group-hover/author:text-indigo-600 dark:group-hover/author:text-indigo-400 transition-colors">
                  {post.author.name}
                </p>
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
              {post.readingTime || 5} min read
            </span>
          </div>
        </div>
      </header>

      {/* Featured Cover Image */}
      <div className="relative aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-2xl ring-1 ring-zinc-900/5">
        <Image
          src={imageUrl}
          alt={post.title}
          width={1200}
          height={675}
          priority
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Table of Contents (Mobile Accordion + Desktop Sticky) */}
        {hasToc && <TableOfContents items={tocItems} />}

        {/* Main Body Text */}
        <div className={hasToc ? 'lg:col-span-8' : 'lg:col-span-12'}>
          <BlogContent content={post.content} tableOfContents={tocItems} />

          {/* Tags Section */}
          {post.tags && post.tags.length > 0 && (
            <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-zinc-800 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-zinc-400 flex items-center gap-1 mr-2">
                <TagIcon className="w-3.5 h-3.5" /> Tags:
              </span>
              {post.tags.map((tag) => (
                <Link
                  key={tag.id}
                  href={`/${locale}/blog?tag=${tag.slug}`}
                  className="px-3 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-800/80 text-zinc-700 dark:text-zinc-300 text-xs font-medium hover:bg-indigo-50 dark:hover:bg-indigo-950 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
                >
                  #{tag.name}
                </Link>
              ))}
            </div>
          )}

          {/* Author Bio Box */}
          {post.author && (
            <div className="mt-12">
              <AuthorCard author={post.author} />
            </div>
          )}
        </div>
      </div>

      {/* Related Posts */}
      <RelatedPosts posts={relatedPosts} locale={locale} />
    </article>
  );
}
