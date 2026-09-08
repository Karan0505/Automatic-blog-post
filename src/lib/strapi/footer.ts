import { fetchStrapi } from './client';
import { FooterData } from '@/types/footer';
import { StrapiResponse } from '@/types/strapi';
import { DEFAULT_LOCALE } from './locales';

export async function getFooter(locale: string = DEFAULT_LOCALE): Promise<FooterData | null> {
  try {
    const res = await fetchStrapi<StrapiResponse<FooterData>>('/footer', {
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
      const fallbackRes = await fetchStrapi<StrapiResponse<FooterData>>('/footer', {
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
