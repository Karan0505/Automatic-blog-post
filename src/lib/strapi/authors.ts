import { fetchStrapi } from './client';
import { Author } from '@/types/author';
import { StrapiResponse } from '@/types/strapi';
import { DEFAULT_LOCALE } from './locales';

export async function getAuthors(locale: string = DEFAULT_LOCALE): Promise<Author[]> {
  try {
    const res = await fetchStrapi<StrapiResponse<Author[]>>('/authors', {
      params: {
        locale,
        populate: '*',
      },
      next: { revalidate: 10 },
    });

    if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
      return res.data;
    }

    if (locale !== DEFAULT_LOCALE) {
      const fallbackRes = await fetchStrapi<StrapiResponse<Author[]>>('/authors', {
        params: {
          locale: DEFAULT_LOCALE,
          populate: '*',
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

export async function getAuthorBySlug(slug: string, locale: string = DEFAULT_LOCALE): Promise<Author | null> {
  try {
    // 1. Direct query in requested locale
    const res = await fetchStrapi<StrapiResponse<Author[]>>('/authors', {
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

    // 2. If not found in requested locale, look for author by slug in default locale
    // to find its documentId and fetch its localized variant
    if (locale !== DEFAULT_LOCALE) {
      const fallbackRes = await fetchStrapi<StrapiResponse<Author[]>>('/authors', {
        params: {
          'filters[slug][$eq]': slug,
          locale: DEFAULT_LOCALE,
          populate: '*',
        },
        next: { revalidate: 10 },
      });

      if (fallbackRes?.data && Array.isArray(fallbackRes.data) && fallbackRes.data.length > 0) {
        const defaultAuthor = fallbackRes.data[0];
        if (defaultAuthor.documentId) {
          const localizedDocRes = await fetchStrapi<StrapiResponse<Author[]>>('/authors', {
            params: {
              'filters[documentId][$eq]': defaultAuthor.documentId,
              locale,
              populate: '*',
            },
            next: { revalidate: 10 },
          });

          if (localizedDocRes?.data && Array.isArray(localizedDocRes.data) && localizedDocRes.data.length > 0) {
            return localizedDocRes.data[0];
          }
        }

        return defaultAuthor;
      }
    }
  } catch {}

  return null;
}
