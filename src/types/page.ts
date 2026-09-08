import { PostSEO, Post } from './blog';

export interface HeroBlockData {
  id?: number;
  __component: 'home-blocks.hero' | 'page-blocks.hero';
  badge?: string;
  heading?: string;
  subheading?: string;
  buttonText?: string;
  buttonLink?: string;
  featuredPost?: Post;
}

export interface AboutHeroBlockData {
  id?: number;
  __component: 'about-blocks.about-hero' | 'page-blocks.about-hero';
  badge?: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface AboutPillarsBlockData {
  id?: number;
  __component: 'about-blocks.about-pillars' | 'page-blocks.about-pillars';
  title?: string;
  pillars?: FeatureCardItem[];
}

export interface AboutPitchBlockData {
  id?: number;
  __component: 'about-blocks.about-pitch' | 'page-blocks.about-pitch';
  icon?: string;
  title: string;
  description?: string;
  buttonText?: string;
  buttonLink?: string;
}

export interface ArticlesHeaderBlockData {
  id?: number;
  __component: 'articles-blocks.articles-header' | 'page-blocks.articles-header';
  badge?: string;
  title: string;
  description?: string;
  icon?: string;
}

export interface ArticlesGridBlockData {
  id?: number;
  __component: 'articles-blocks.articles-grid' | 'page-blocks.articles-grid';
  showCategoryFilter?: boolean;
  showTagFilter?: boolean;
  pageSize?: number;
  columns?: number;
}

export interface TopicsGridBlockData {
  id?: number;
  __component: 'home-blocks.topics-grid' | 'page-blocks.topics-grid';
  title?: string;
  subtitle?: string;
  viewAllText?: string;
  viewAllLink?: string;
  limit?: number;
}

export interface TrendingPostsBlockData {
  id?: number;
  __component: 'home-blocks.trending-posts' | 'page-blocks.trending-posts';
  title?: string;
  subtitle?: string;
  limit?: number;
}

export interface LatestPostsBlockData {
  id?: number;
  __component: 'home-blocks.latest-posts' | 'page-blocks.latest-posts';
  title?: string;
  subtitle?: string;
  browseArchiveText?: string;
  browseArchiveLink?: string;
  limit?: number;
}

export interface FeaturedAuthorsBlockData {
  id?: number;
  __component: 'shared-blocks.featured-authors' | 'page-blocks.featured-authors';
  title?: string;
  subtitle?: string;
  limit?: number;
}

export interface NewsletterCtaBlockData {
  id?: number;
  __component: 'shared-blocks.newsletter-cta' | 'page-blocks.newsletter-cta';
  badge?: string;
  title?: string;
  description?: string;
  buttonText?: string;
  placeholder?: string;
}

export interface CtaBannerBlockData {
  id?: number;
  __component: 'shared-blocks.cta-banner' | 'page-blocks.cta-banner';
  badge?: string;
  title: string;
  description?: string;
  primaryButtonText?: string;
  primaryButtonLink?: string;
  secondaryButtonText?: string;
  secondaryButtonLink?: string;
}

export interface RichTextBlockData {
  id?: number;
  __component: 'shared-blocks.rich-text' | 'page-blocks.rich-text';
  title?: string;
  content: string;
}

export interface FeatureCardItem {
  id?: number;
  icon?: string;
  title: string;
  description: string;
  link?: string;
}

export interface FeatureCardsBlockData {
  id?: number;
  __component: 'shared-blocks.feature-cards' | 'page-blocks.feature-cards';
  title?: string;
  subtitle?: string;
  cards?: FeatureCardItem[];
}

export type PageBlock =
  | HeroBlockData
  | AboutHeroBlockData
  | AboutPillarsBlockData
  | AboutPitchBlockData
  | ArticlesHeaderBlockData
  | ArticlesGridBlockData
  | TopicsGridBlockData
  | TrendingPostsBlockData
  | LatestPostsBlockData
  | FeaturedAuthorsBlockData
  | NewsletterCtaBlockData
  | CtaBannerBlockData
  | RichTextBlockData
  | FeatureCardsBlockData;

export interface HomePageData {
  id?: number;
  documentId?: string;
  blocks?: PageBlock[];
  seo?: PostSEO;
}

export interface AboutPageData {
  id?: number;
  documentId?: string;
  blocks?: PageBlock[];
  seo?: PostSEO;
}

export interface ArticlesPageData {
  id?: number;
  documentId?: string;
  blocks?: PageBlock[];
  seo?: PostSEO;
}
