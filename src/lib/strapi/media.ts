import { StrapiMedia } from '@/types/strapi';

export function getStrapiMediaUrl(
  media?: StrapiMedia | string | null,
  fallback = ''
): string {
  if (!media) return fallback;

  const baseUrl = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';

  if (typeof media === 'string') {
    if (media.startsWith('http://') || media.startsWith('https://')) {
      return media;
    }
    if (media.startsWith('/uploads/')) {
      return `${baseUrl}${media}`;
    }
    if (media.startsWith('/')) {
      return media;
    }
    return `${baseUrl}/${media}`;
  }

  const url = media.url;
  if (!url) return fallback;

  if (url.startsWith('http://') || url.startsWith('https://')) {
    return url;
  }

  return `${baseUrl}${url.startsWith('/') ? '' : '/'}${url}`;
}
