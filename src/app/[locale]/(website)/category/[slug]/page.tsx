import * as React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { Layers, ArrowLeft } from 'lucide-react';
import { getCategoryBySlug, getCategories } from '@/lib/strapi/categories';
import { getPosts } from '@/lib/strapi/posts';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { Pagination } from '@/components/blog/Pagination';

interface CategoryPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const category = await getCategoryBySlug(slug, locale);

  if (!category) {
    return {
      title: 'Category Not Found',
    };
  }

  return {
    title: `${category.name} Articles & Guides`,
    description: category.description || `Browse our collection of articles on ${category.name}.`,
  };
}

export const revalidate = 10;

export default async function CategoryPage({ params, searchParams }: CategoryPageProps) {
  const { slug, locale } = await params;
  const sParams = await searchParams;
  const page = Number(sParams.page) || 1;

  const [category, allCategories] = await Promise.all([
    getCategoryBySlug(slug, locale),
    getCategories(locale),
  ]);

  if (!category) {
    notFound();
  }

  const postsData = await getPosts({ category: category.slug, page, pageSize: 6, locale });

  return (
    <div className="space-y-12">
      {/* Category Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-b from-white/90 via-white/50 to-white/30 dark:from-zinc-900/90 dark:via-zinc-900/50 dark:to-zinc-900/30 p-8 sm:p-12 backdrop-blur-xl">
        <Link
          href={`/${locale}/blog`}
          className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 mb-6 transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back to All Topics
        </Link>

        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-3">
              <div
                className="w-10 h-10 rounded-2xl flex items-center justify-center text-white shadow-md"
                style={{ backgroundColor: category.color || '#6366f1' }}
              >
                <Layers className="w-5 h-5" />
              </div>
              <span className="text-xs font-bold uppercase tracking-wider text-zinc-500">
                Category Collection
              </span>
            </div>
            <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {category.name}
            </h1>
            {category.description && (
              <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-300 leading-relaxed">
                {category.description}
              </p>
            )}
          </div>

          <div className="shrink-0">
            <span className="inline-block px-4 py-2 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-bold text-indigo-600 dark:text-indigo-400">
              {postsData.pagination.total} {postsData.pagination.total === 1 ? 'Article' : 'Articles'}
            </span>
          </div>
        </div>
      </div>

      {/* Category Pills Navigation */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        <Link
          href={`/${locale}/blog`}
          className="px-4 py-2 rounded-xl text-xs font-bold shrink-0 bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700 transition-colors"
        >
          All Topics
        </Link>
        {allCategories.map((cat) => {
          const isActive = cat.slug === slug;
          return (
            <Link
              key={cat.id}
              href={`/${locale}/category/${cat.slug}`}
              className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                isActive
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {cat.name}
            </Link>
          );
        })}
      </div>

      {/* Articles Grid */}
      <BlogGrid posts={postsData.posts} columns={3} locale={locale} />

      {/* Pagination */}
      <Pagination
        currentPage={postsData.pagination.page}
        totalPages={postsData.pagination.pageCount}
      />
    </div>
  );
}
