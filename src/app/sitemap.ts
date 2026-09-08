import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/constants';
import { SUPPORTED_LOCALES } from '@/lib/strapi/locales';
import { getPosts } from '@/lib/strapi/posts';
import { getCategories } from '@/lib/strapi/categories';
import { getAuthors } from '@/lib/strapi/authors';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || SITE_CONFIG.url || 'http://localhost:3000';
  const currentDate = new Date();

  const entries: MetadataRoute.Sitemap = [];

  // Static root & localized pages
  for (const locale of SUPPORTED_LOCALES) {
    entries.push(
      {
        url: `${baseUrl}/${locale}`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 1.0,
      },
      {
        url: `${baseUrl}/${locale}/blog`,
        lastModified: currentDate,
        changeFrequency: 'daily',
        priority: 0.9,
      },
      {
        url: `${baseUrl}/${locale}/about`,
        lastModified: currentDate,
        changeFrequency: 'monthly',
        priority: 0.7,
      },
      {
        url: `${baseUrl}/${locale}/search`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.5,
      }
    );

    try {
      // Dynamic posts per locale
      const postsData = await getPosts({ pageSize: 100, locale });
      for (const post of postsData.posts) {
        if (post.slug) {
          entries.push({
            url: `${baseUrl}/${locale}/blog/${post.slug}`,
            lastModified: post.updatedAt ? new Date(post.updatedAt) : currentDate,
            changeFrequency: 'weekly',
            priority: 0.8,
          });
        }
      }

      // Dynamic categories per locale
      const categories = await getCategories(locale);
      for (const cat of categories) {
        if (cat.slug) {
          entries.push({
            url: `${baseUrl}/${locale}/category/${cat.slug}`,
            lastModified: currentDate,
            changeFrequency: 'weekly',
            priority: 0.7,
          });
        }
      }

      // Dynamic authors per locale
      const authors = await getAuthors(locale);
      for (const author of authors) {
        if (author.slug) {
          entries.push({
            url: `${baseUrl}/${locale}/author/${author.slug}`,
            lastModified: currentDate,
            changeFrequency: 'monthly',
            priority: 0.6,
          });
        }
      }
    } catch (err) {
      console.warn(`Sitemap generation error for locale ${locale}:`, err);
    }
  }

  return entries;
}
