const STRAPI_BASE_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';
const STRAPI_API_TOKEN = process.env.STRAPI_API_TOKEN || '';

const isDev = process.env.NODE_ENV === 'development';

export interface FetchOptions extends RequestInit {
  params?: Record<string, string | number | boolean | undefined>;
  next?: {
    revalidate?: number | false;
    tags?: string[];
  };
}

export async function fetchStrapi<T>(path: string, options: FetchOptions = {}): Promise<T | null> {
  const { params, headers, ...restOptions } = options;

  try {
    let url = `${STRAPI_BASE_URL}/api${path.startsWith('/') ? path : `/${path}`}`;

    if (params) {
      const searchParams = new URLSearchParams();
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, String(value));
        }
      });
      const queryString = searchParams.toString();
      if (queryString) {
        url += (url.includes('?') ? '&' : '?') + queryString;
      }
    }

    const defaultHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (STRAPI_API_TOKEN) {
      defaultHeaders['Authorization'] = `Bearer ${STRAPI_API_TOKEN}`;
    }

    const response = await fetch(url, {
      headers: {
        ...defaultHeaders,
        ...(headers as Record<string, string>),
      },
      // In development mode, disable cache so changes in Strapi appear immediately
      cache: isDev ? 'no-store' : (restOptions.cache || undefined),
      next: isDev ? { revalidate: 0 } : (restOptions.next || { revalidate: 10 }),
      ...restOptions,
    });

    if (!response.ok) {
      // Return null on HTTP errors so calling functions fallback cleanly
      return null;
    }

    const data = await response.json();
    return data as T;
  } catch {
    // Return null on network or timeout errors so UI falls back gracefully
    return null;
  }
}
