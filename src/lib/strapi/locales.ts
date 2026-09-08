import { fetchStrapi } from './client';

export interface StrapiLocale {
  id: number;
  documentId: string;
  name: string;
  code: string;
  isDefault?: boolean;
}

export const DEFAULT_LOCALE = process.env.DEFAULT_LOCALE || 'en';

export const SUPPORTED_LOCALES = ['en', 'gu', 'gu-IN', 'hi', 'hi-IN', 'zh-Hans-SG'] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];

export function isValidLocale(locale: string): boolean {
  return (SUPPORTED_LOCALES as readonly string[]).includes(locale);
}

/**
 * Dynamically fetches active locales from Strapi official i18n endpoint
 */
export async function getLocales(): Promise<StrapiLocale[]> {
  try {
    const res = await fetchStrapi<StrapiLocale[] | { data: StrapiLocale[] }>('/i18n/locales', {
      next: { revalidate: 10 },
    });

    if (Array.isArray(res)) {
      return res;
    }
    if (res && typeof res === 'object' && 'data' in res && Array.isArray(res.data)) {
      return res.data;
    }
    return [
      { id: 1, documentId: 'default', name: 'English', code: DEFAULT_LOCALE, isDefault: true },
    ];
  } catch (error) {
    console.warn('Could not fetch Strapi locales, falling back to default:', error);
    return [
      { id: 1, documentId: 'default', name: 'English', code: DEFAULT_LOCALE, isDefault: true },
    ];
  }
}
