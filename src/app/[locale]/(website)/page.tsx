import * as React from 'react';
import { getPosts } from '@/lib/strapi/posts';
import { getCategories } from '@/lib/strapi/categories';
import { getAuthors } from '@/lib/strapi/authors';
import { getHomePage } from '@/lib/strapi/pages';
import { HomePageBuilder } from '@/components/page-builder';
import { PageBlock } from '@/types/page';

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface HomePageProps {
  params: Promise<{ locale: string }>;
}

export default async function HomePage({ params }: HomePageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'en';

  const [postsData, categories, authors, homeData] = await Promise.all([
    getPosts({ page: 1, pageSize: 12, locale }),
    getCategories(locale),
    getAuthors(locale),
    getHomePage(locale),
  ]);

  const allPosts = postsData.posts;

  const fallbackBlocks: PageBlock[] = [
    {
      __component: 'home-blocks.hero',
      badge: 'Featured Editorial',
      heading: 'Architectural Decisions in Modern Web Systems',
      subheading: 'Exploring component-driven design systems, headless content APIs, and extreme front-end performance patterns.',
      buttonText: 'Read Full Story',
      buttonLink: `/${locale}/blog`,
    },
    {
      __component: 'home-blocks.topics-grid',
      title: 'Explore Core Topics',
      subtitle: 'Curated collections across software architecture and engineering',
      viewAllText: 'View All Topics',
      viewAllLink: `/${locale}/blog`,
      limit: 4,
    },
    {
      __component: 'home-blocks.trending-posts',
      title: 'Trending Insights',
      subtitle: 'Most engaging engineering blueprints and architectural patterns',
      limit: 2,
    },
    {
      __component: 'home-blocks.latest-posts',
      title: 'Latest Publications',
      subtitle: 'Freshly released technical essays and development guides',
      browseArchiveText: 'Browse Archive',
      browseArchiveLink: `/${locale}/blog`,
      limit: 6,
    },
    {
      __component: 'shared-blocks.featured-authors',
      title: 'Featured Contributors',
      subtitle: 'Written by seasoned engineers, tech leads, and systems designers',
      limit: 3,
    },
    {
      __component: 'shared-blocks.newsletter-cta',
      badge: 'Join 25,000+ Engineers',
      title: 'Stay ahead of modern full-stack engineering trends',
      description: 'Get weekly architectural blueprints, headless CMS deep dives, and performance tips straight to your inbox. No spam, unsubscribe anytime.',
      buttonText: 'Subscribe Free',
      placeholder: 'Enter your professional email...',
    },
  ];

  const blocksToRender =
    homeData?.blocks && homeData.blocks.length > 0
      ? homeData.blocks
      : fallbackBlocks;

  return (
    <HomePageBuilder
      blocks={blocksToRender}
      posts={allPosts}
      categories={categories}
      authors={authors}
      locale={locale}
    />
  );
}
