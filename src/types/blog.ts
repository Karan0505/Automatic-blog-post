import { StrapiMedia } from './strapi';
import { Author } from './author';
import { Category } from './category';
import { Tag } from './tag';

export interface TableOfContentsItem {
  id?: number;
  title: string;
  anchor: string;
  level: number;
}

export interface PostSEO {
  id?: number;
  metaTitle: string;
  metaDescription: string;
  shareImage?: StrapiMedia | string;
  canonicalURL?: string;
  keywords?: string;
  preventIndexing?: boolean;
}

export interface Comment {
  id: number;
  documentId?: string;
  authorName: string;
  authorEmail?: string;
  content: string;
  isApproved: boolean;
  createdAt: string;
}

export interface Post {
  id: number;
  documentId?: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: StrapiMedia | string;
  readingTime?: number;
  featured?: boolean;
  trending?: boolean;
  publishedAt?: string;
  publishedAtCustom?: string;
  createdAt?: string;
  updatedAt?: string;
  category?: Category;
  author?: Author;
  tags?: Tag[];
  comments?: Comment[];
  seo?: PostSEO;
  tableOfContents?: TableOfContentsItem[];
  aiGenerated?: boolean;
  aiModel?: string;
  aiPrompt?: string;
  aiCostUsd?: number;
  moderationStatus?: 'pending' | 'approved' | 'flagged' | 'rejected';
  workflowStatus?: 'draft' | 'review' | 'approved' | 'archived';
  translationPending?: boolean;
}
