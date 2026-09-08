import * as React from 'react';
import { PageBlock } from '@/types/page';
import { Post } from '@/types/blog';
import { Category } from '@/types/category';
import { Tag } from '@/types/tag';
import { Author } from '@/types/author';

import { ArticlesHeaderBlock, ArticlesGridBlock } from './articles';
import { HeroBlock, TopicsGridBlock, TrendingPostsBlock, LatestPostsBlock } from './home';
import { FeaturedAuthorsBlock, NewsletterBlock, CtaBannerBlock, RichTextBlock, FeatureCardsBlock } from './shared';

export interface ArticlesPageBuilderProps {
  blocks?: PageBlock[];
  posts?: Post[];
  categories?: Category[];
  tags?: Tag[];
  authors?: Author[];
  activeCategory?: string;
  activeTag?: string;
  currentPage?: number;
  totalPages?: number;
  locale?: string;
}

export function ArticlesPageBuilder({
  blocks = [],
  posts = [],
  categories = [],
  tags = [],
  authors = [],
  activeCategory,
  activeTag,
  currentPage = 1,
  totalPages = 1,
  locale = 'en',
}: ArticlesPageBuilderProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-16">
      {blocks.map((block, index) => {
        const key = `articles-block-${block.__component}-${block.id ?? index}-${index}`;

        switch (block.__component) {
          case 'articles-blocks.articles-header':
          case 'page-blocks.articles-header':
            return <ArticlesHeaderBlock key={key} block={block} />;

          case 'articles-blocks.articles-grid':
          case 'page-blocks.articles-grid':
            return (
              <ArticlesGridBlock
                key={key}
                block={block}
                posts={posts}
                categories={categories}
                tags={tags}
                activeCategory={activeCategory}
                activeTag={activeTag}
                currentPage={currentPage}
                totalPages={totalPages}
                locale={locale}
              />
            );

          case 'home-blocks.hero':
          case 'page-blocks.hero':
            return <HeroBlock key={key} block={block} posts={posts} locale={locale} />;

          case 'home-blocks.topics-grid':
          case 'page-blocks.topics-grid':
            return <TopicsGridBlock key={key} block={block} categories={categories} locale={locale} />;

          case 'home-blocks.trending-posts':
          case 'page-blocks.trending-posts':
            return <TrendingPostsBlock key={key} block={block} posts={posts} locale={locale} />;

          case 'home-blocks.latest-posts':
          case 'page-blocks.latest-posts':
            return <LatestPostsBlock key={key} block={block} posts={posts} locale={locale} />;

          case 'shared-blocks.featured-authors':
          case 'page-blocks.featured-authors':
            return <FeaturedAuthorsBlock key={key} block={block} authors={authors} locale={locale} />;

          case 'shared-blocks.newsletter-cta':
          case 'page-blocks.newsletter-cta':
            return <NewsletterBlock key={key} block={block} />;

          case 'shared-blocks.cta-banner':
          case 'page-blocks.cta-banner':
            return <CtaBannerBlock key={key} block={block} />;

          case 'shared-blocks.rich-text':
          case 'page-blocks.rich-text':
            return <RichTextBlock key={key} block={block} />;

          case 'shared-blocks.feature-cards':
          case 'page-blocks.feature-cards':
            return <FeatureCardsBlock key={key} block={block} />;

          default:
            return null;
        }
      })}
    </div>
  );
}
