import { StrapiMedia } from './strapi';

export interface Category {
  id: number;
  documentId?: string;
  name: string;
  slug: string;
  description?: string;
  color?: string;
  image?: StrapiMedia | string;
  postCount?: number;
  createdAt?: string;
  updatedAt?: string;
}
