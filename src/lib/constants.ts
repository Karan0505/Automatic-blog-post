import { Post } from '@/types/blog';
import { Author } from '@/types/author';
import { Category } from '@/types/category';
import { Tag } from '@/types/tag';

export const SITE_CONFIG = {
  name: 'Chronicle',
  title: 'Chronicle — Modern Thoughts, Engineering & Design',
  description: 'A cutting-edge editorial publication covering modern web development, headless CMS architectures, design engineering, and cloud scalability.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
  ogImage: '',
  links: {
    twitter: 'https://twitter.com',
    github: 'https://github.com',
    linkedin: 'https://linkedin.com',
    youtube: 'https://youtube.com',
  },
  author: 'Chronicle Editorial Team',
};

export const MOCK_CATEGORIES: Category[] = [];

export const MOCK_TAGS: Tag[] = [];

export const MOCK_AUTHORS: Author[] = [];

export const MOCK_POSTS: Post[] = [];
