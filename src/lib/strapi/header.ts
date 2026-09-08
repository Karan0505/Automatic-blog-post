import { fetchStrapi } from './client';
import { HeaderData } from '@/types/header';
import { StrapiResponse } from '@/types/strapi';
import { DEFAULT_LOCALE } from './locales';

export async function getHeader(locale: string = DEFAULT_LOCALE): Promise<HeaderData | null> {
  try {
    const res = await fetchStrapi<StrapiResponse<HeaderData>>('/header', {
      params: {
        locale,
        populate: '*',
      },
      next: { revalidate: 10 },
    });

    if (res?.data) {
      return res.data;
    }

    if (locale !== DEFAULT_LOCALE) {
      const fallbackRes = await fetchStrapi<StrapiResponse<HeaderData>>('/header', {
        params: {
          locale: DEFAULT_LOCALE,
          populate: '*',
        },
        next: { revalidate: 10 },
      });
      return fallbackRes?.data || null;
    }
  } catch {}

  return null;
}
