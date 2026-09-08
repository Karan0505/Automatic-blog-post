import * as React from 'react';
import Link from 'next/link';
import { Tag as TagIcon } from 'lucide-react';
import { ArticlesGridBlockData } from '@/types/page';
import { Post } from '@/types/blog';
import { Category } from '@/types/category';
import { Tag } from '@/types/tag';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { Pagination } from '@/components/blog/Pagination';

interface ArticlesGridBlockProps {
  block: ArticlesGridBlockData;
  posts?: Post[];
  categories?: Category[];
  tags?: Tag[];
  activeCategory?: string;
  activeTag?: string;
  currentPage?: number;
  totalPages?: number;
  locale?: string;
}

export function ArticlesGridBlock({
  block,
  posts = [],
  categories = [],
  tags = [],
  activeCategory,
  activeTag,
  currentPage = 1,
  totalPages = 1,
  locale = 'en',
}: ArticlesGridBlockProps) {
  const showCategoryFilter = block.showCategoryFilter !== false;
  const showTagFilter = block.showTagFilter !== false;
  const columns = (block.columns === 2 ? 2 : 3) as 2 | 3;

  return (
    <div className="space-y-8">
      {/* Category Pills Navigation */}
      {showCategoryFilter && categories.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
            <Link
              href={`/${locale}/blog`}
              className={`px-4 py-2 rounded-xl text-xs font-bold shrink-0 transition-all ${
                !activeCategory && !activeTag
                  ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                  : 'bg-zinc-100 dark:bg-zinc-800/80 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              All Articles
            </Link>
            {categories.map((cat) => {
              const isActive = activeCategory === cat.slug;
              return (
                <Link
                  key={cat.id}
                  href={`/${locale}/blog?category=${cat.slug}`}
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

          {/* Tag Filters */}
          {showTagFilter && tags.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap text-xs pt-1">
              <span className="text-zinc-400 flex items-center gap-1 font-medium">
                <TagIcon className="w-3 h-3" /> Filter by tag:
              </span>
              {tags.map((t) => {
                const isSelected = activeTag === t.slug;
                return (
                  <Link
                    key={t.id}
                    href={isSelected ? `/${locale}/blog` : `/${locale}/blog?tag=${t.slug}`}
                    className={`px-2.5 py-1 rounded-lg transition-colors font-medium ${
                      isSelected
                        ? 'bg-indigo-100 dark:bg-indigo-900/60 text-indigo-700 dark:text-indigo-300 border border-indigo-300 dark:border-indigo-700'
                        : 'text-zinc-500 hover:text-zinc-900 dark:hover:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    #{t.name}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* Blog Cards Grid */}
      <BlogGrid posts={posts} columns={columns} locale={locale} />

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
        />
      )}
    </div>
  );
}
