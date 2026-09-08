import { fetchStrapi } from './client';
import { HomePageData, AboutPageData, ArticlesPageData } from '@/types/page';
import { StrapiResponse } from '@/types/strapi';
import { DEFAULT_LOCALE } from './locales';

export async function getHomePage(locale: string = DEFAULT_LOCALE): Promise<HomePageData | null> {
  try {
    const res = await fetchStrapi<StrapiResponse<HomePageData>>('/home-page', {
      params: {
        locale,
        'populate[blocks][populate]': '*',
        'populate[seo][populate]': '*',
      },
    });

    if (res?.data && (res.data.blocks?.length ?? 0) > 0) {
      return res.data;
    }

    // Fallback to default locale if localized content is missing
    if (locale !== DEFAULT_LOCALE) {
      const fallbackRes = await fetchStrapi<StrapiResponse<HomePageData>>('/home-page', {
        params: {
          locale: DEFAULT_LOCALE,
          'populate[blocks][populate]': '*',
          'populate[seo][populate]': '*',
        },
      });
      return fallbackRes?.data || null;
    }
  } catch {}

  return null;
}

export async function getAboutPage(locale: string = DEFAULT_LOCALE): Promise<AboutPageData | null> {
  try {
    const res = await fetchStrapi<StrapiResponse<AboutPageData>>('/about-page', {
      params: {
        locale,
        'populate[blocks][populate]': '*',
        'populate[seo][populate]': '*',
      },
    });

    if (res?.data && (res.data.blocks?.length ?? 0) > 0) {
      return res.data;
    }

    // Fallback to default locale if localized content is missing
    if (locale !== DEFAULT_LOCALE) {
      const fallbackRes = await fetchStrapi<StrapiResponse<AboutPageData>>('/about-page', {
        params: {
          locale: DEFAULT_LOCALE,
          'populate[blocks][populate]': '*',
          'populate[seo][populate]': '*',
        },
      });
      return fallbackRes?.data || null;
    }
  } catch {}

  return null;
}

export async function getArticlesPage(locale: string = DEFAULT_LOCALE): Promise<ArticlesPageData | null> {
  try {
    const res = await fetchStrapi<StrapiResponse<ArticlesPageData>>('/articles-page', {
      params: {
        locale,
        'populate[blocks][populate]': '*',
        'populate[seo][populate]': '*',
      },
    });

    if (res?.data && (res.data.blocks?.length ?? 0) > 0) {
      return res.data;
    }

    // Fallback to default locale if localized content is missing
    if (locale !== DEFAULT_LOCALE) {
      const fallbackRes = await fetchStrapi<StrapiResponse<ArticlesPageData>>('/articles-page', {
        params: {
          locale: DEFAULT_LOCALE,
          'populate[blocks][populate]': '*',
          'populate[seo][populate]': '*',
        },
      });
      return fallbackRes?.data || null;
    }
  } catch {}

  return null;
}
