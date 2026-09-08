import { StrapiMedia } from './strapi';

export interface SocialLink {
  id?: number;
  platform: 'twitter' | 'github' | 'linkedin' | 'youtube' | 'website' | 'instagram';
  url: string;
}

export interface Author {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  role?: string;
  email?: string;
  bio?: string;
  avatar?: StrapiMedia | string;
  socialLinks?: SocialLink[];
  postCount?: number;
  createdAt?: string;
  updatedAt?: string;
}
