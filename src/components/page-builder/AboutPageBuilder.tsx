import * as React from 'react';
import { PageBlock } from '@/types/page';
import { Author } from '@/types/author';

import { AboutHeroBlock, AboutPillarsBlock, AboutPitchBlock } from './about';
import { FeaturedAuthorsBlock, NewsletterBlock, CtaBannerBlock, RichTextBlock, FeatureCardsBlock } from './shared';

export interface AboutPageBuilderProps {
  blocks?: PageBlock[];
  authors?: Author[];
}

export function AboutPageBuilder({
  blocks = [],
  authors = [],
}: AboutPageBuilderProps) {
  if (!blocks || blocks.length === 0) {
    return null;
  }

  return (
    <div className="space-y-16">
      {blocks.map((block, index) => {
        const key = `about-block-${block.__component}-${block.id ?? index}-${index}`;

        switch (block.__component) {
          case 'about-blocks.about-hero':
          case 'page-blocks.about-hero':
            return <AboutHeroBlock key={key} block={block} />;

          case 'about-blocks.about-pillars':
          case 'page-blocks.about-pillars':
            return <AboutPillarsBlock key={key} block={block} />;

          case 'about-blocks.about-pitch':
          case 'page-blocks.about-pitch':
            return <AboutPitchBlock key={key} block={block} />;

          case 'shared-blocks.featured-authors':
          case 'page-blocks.featured-authors':
            return <FeaturedAuthorsBlock key={key} block={block} authors={authors} />;

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
