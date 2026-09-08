import * as React from 'react';
import { PageBlock } from '@/types/page';
import { Post } from '@/types/blog';
import { Category } from '@/types/category';
import { Author } from '@/types/author';

import { HeroBlock, TopicsGridBlock, TrendingPostsBlock, LatestPostsBlock } from './home';
import { AboutHeroBlock, AboutPillarsBlock, AboutPitchBlock } from './about';
import { ArticlesHeaderBlock, ArticlesGridBlock } from './articles';
import { FeaturedAuthorsBlock, NewsletterBlock, CtaBannerBlock, RichTextBlock, FeatureCardsBlock } from './shared';

export interface PageBuilderProps {
  blocks?: PageBlock[];
  posts?: Post[];
  categories?: Category[];
  authors?: Author[];
  locale?: string;
}

export function PageBuilder({
  blocks = [],
  posts = [],
  categories = [],
  authors = [],
  locale = 'en',
}: PageBuilderProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-20">
      {blocks.map((block, index) => {
        const key = `block-${block.__component}-${block.id ?? index}-${index}`;

        switch (block.__component) {
          case 'home-blocks.hero':
          case 'page-blocks.hero':
            return <HeroBlock key={key} block={block} posts={posts} locale={locale} />;

          case 'about-blocks.about-hero':
          case 'page-blocks.about-hero':
            return <AboutHeroBlock key={key} block={block} />;

          case 'about-blocks.about-pillars':
          case 'page-blocks.about-pillars':
            return <AboutPillarsBlock key={key} block={block} />;

          case 'about-blocks.about-pitch':
          case 'page-blocks.about-pitch':
            return <AboutPitchBlock key={key} block={block} />;

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
                locale={locale}
              />
            );

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
