import * as React from 'react';
import { Metadata } from 'next';
import { getPosts } from '@/lib/strapi/posts';
import { getCategories } from '@/lib/strapi/categories';
import { getTags } from '@/lib/strapi/tags';
import { getAuthors } from '@/lib/strapi/authors';
import { getArticlesPage } from '@/lib/strapi/pages';
import { ArticlesPageBuilder } from '@/components/page-builder';
import { PageBlock } from '@/types/page';

export const metadata: Metadata = {
  title: 'All Articles & Engineering Blueprints',
  description: 'Explore the complete archive of technical guides, design systems, and headless architectures.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface BlogPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{
    page?: string;
    category?: string;
    tag?: string;
  }>;
}

export default async function BlogPage({ params, searchParams }: BlogPageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'en';

  const sParams = await searchParams;
  const page = Number(sParams.page) || 1;
  const category = sParams.category;
  const tag = sParams.tag;

  const [postsData, categories, tags, authors, articlesData] = await Promise.all([
    getPosts({ page, pageSize: 6, category, tag, locale }),
    getCategories(locale),
    getTags(),
    getAuthors(locale),
    getArticlesPage(locale),
  ]);

  const fallbackBlocks: PageBlock[] = [
    {
      __component: 'articles-blocks.articles-header',
      badge: 'Publication Archive',
      title: 'Articles & Insights',
      description: 'In-depth perspectives, architectural case studies, and engineering tutorials authored by practitioners.',
      icon: 'BookOpen',
    },
    {
      __component: 'articles-blocks.articles-grid',
      showCategoryFilter: true,
      showTagFilter: true,
      pageSize: 6,
      columns: 3,
    },
    {
      __component: 'shared-blocks.newsletter-cta',
      badge: 'Join 25,000+ Engineers',
      title: 'Stay ahead of modern full-stack engineering trends',
      description: 'Get weekly architectural blueprints, headless CMS deep dives, and performance tips straight to your inbox.',
      buttonText: 'Subscribe Free',
      placeholder: 'Enter your professional email...',
    },
  ];

  const blocksToRender =
    articlesData?.blocks && articlesData.blocks.length > 0
      ? articlesData.blocks
      : fallbackBlocks;

  return (
    <div className="space-y-12">
      <ArticlesPageBuilder
        blocks={blocksToRender}
        posts={postsData.posts}
        categories={categories}
        tags={tags}
        authors={authors}
        activeCategory={category}
        activeTag={tag}
        currentPage={postsData.pagination.page}
        totalPages={postsData.pagination.pageCount}
        locale={locale}
      />
    </div>
  );
}
