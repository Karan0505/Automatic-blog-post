import { fetchStrapi } from './client';
import { Category } from '@/types/category';
import { StrapiResponse } from '@/types/strapi';
import { DEFAULT_LOCALE } from './locales';

export async function getCategories(locale: string = DEFAULT_LOCALE): Promise<Category[]> {
  try {
    const res = await fetchStrapi<StrapiResponse<Category[]>>('/categories', {
      params: {
        locale,
        populate: '*',
        'sort[0]': 'name:asc',
      },
      next: { revalidate: 10 },
    });

    if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }

    if (locale !== DEFAULT_LOCALE) {
      const fallbackRes = await fetchStrapi<StrapiResponse<Category[]>>('/categories', {
        params: {
          locale: DEFAULT_LOCALE,
          populate: '*',
          'sort[0]': 'name:asc',
        },
        next: { revalidate: 10 },
      });
      if (fallbackRes?.data && Array.isArray(fallbackRes.data)) {
        return fallbackRes.data;
      }
    }
  } catch {}

  return [];
}

export async function getCategoryBySlug(slug: string, locale: string = DEFAULT_LOCALE): Promise<Category | null> {
  try {
    // 1. Direct query in requested locale
    const res = await fetchStrapi<StrapiResponse<Category[]>>('/categories', {
      params: {
        'filters[slug][$eq]': slug,
        locale,
        populate: '*',
      },
      next: { revalidate: 10 },
    });

    if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
      return res.data[0];
    }

    // 2. If not found in requested locale, look for category by slug in default locale
    // to find its documentId and fetch its localized variant
    if (locale !== DEFAULT_LOCALE) {
      const fallbackRes = await fetchStrapi<StrapiResponse<Category[]>>('/categories', {
        params: {
          'filters[slug][$eq]': slug,
          locale: DEFAULT_LOCALE,
          populate: '*',
        },
        next: { revalidate: 10 },
      });

      if (fallbackRes?.data && Array.isArray(fallbackRes.data) && fallbackRes.data.length > 0) {
        const defaultCategory = fallbackRes.data[0];
        if (defaultCategory.documentId) {
          const localizedDocRes = await fetchStrapi<StrapiResponse<Category[]>>('/categories', {
            params: {
              'filters[documentId][$eq]': defaultCategory.documentId,
              locale,
              populate: '*',
            },
            next: { revalidate: 10 },
          });

          if (localizedDocRes?.data && Array.isArray(localizedDocRes.data) && localizedDocRes.data.length > 0) {
            return localizedDocRes.data[0];
          }
        }

        return defaultCategory;
      }
    }
  } catch {}

  return null;
}
