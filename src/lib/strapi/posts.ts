import { fetchStrapi } from './client';
import { Post } from '@/types/blog';
import { StrapiResponse } from '@/types/strapi';
import { DEFAULT_LOCALE } from './locales';

export interface GetPostsParams {
  page?: number;
  pageSize?: number;
  category?: string;
  author?: string;
  tag?: string;
  search?: string;
  featured?: boolean;
  trending?: boolean;
  locale?: string;
}

export interface GetPostsResult {
  posts: Post[];
  pagination: {
    page: number;
    pageSize: number;
    pageCount: number;
    total: number;
  };
}

export async function getPosts(params: GetPostsParams = {}): Promise<GetPostsResult> {
  const {
    page = 1,
    pageSize = 6,
    category,
    author,
    tag,
    search,
    featured,
    trending,
    locale = DEFAULT_LOCALE,
  } = params;

  try {
    const queryParams: Record<string, string | number | boolean | undefined> = {
      'pagination[page]': page,
      'pagination[pageSize]': pageSize,
      'sort[0]': 'createdAt:desc',
      locale,
      populate: '*',
    };

    if (category) {
      queryParams['filters[category][slug][$eq]'] = category;
    }
    if (author) {
      queryParams['filters[author][slug][$eq]'] = author;
    }
    if (tag) {
      queryParams['filters[tags][slug][$eq]'] = tag;
    }
    if (featured !== undefined) {
      queryParams['filters[featured][$eq]'] = featured;
    }
    if (trending !== undefined) {
      queryParams['filters[trending][$eq]'] = trending;
    }
    if (search) {
      queryParams['filters[$or][0][title][$containsi]'] = search;
      queryParams['filters[$or][1][excerpt][$containsi]'] = search;
    }

    const res = await fetchStrapi<StrapiResponse<Post[]>>('/posts', {
      params: queryParams,
      next: { revalidate: 10 },
    });

    if (res?.data && Array.isArray(res.data) && res.data.length > 0) {
      return {
        posts: res.data,
        pagination: res.meta?.pagination || {
          page,
          pageSize,
          pageCount: Math.ceil(res.data.length / pageSize),
          total: res.data.length,
        },
      };
    }

    // Fallback to default locale if requested locale has no posts
    if (locale !== DEFAULT_LOCALE) {
      queryParams.locale = DEFAULT_LOCALE;
      const fallbackRes = await fetchStrapi<StrapiResponse<Post[]>>('/posts', {
        params: queryParams,
        next: { revalidate: 10 },
      });
      if (fallbackRes?.data && Array.isArray(fallbackRes.data)) {
        return {
          posts: fallbackRes.data,
          pagination: fallbackRes.meta?.pagination || {
            page,
            pageSize,
            pageCount: Math.ceil(fallbackRes.data.length / pageSize),
            total: fallbackRes.data.length,
          },
        };
      }
    }
  } catch { }

  return {
    posts: [],
    pagination: {
      page,
      pageSize,
      pageCount: 0,
      total: 0,
    },
  };
}

export async function getPostBySlug(slug: string, locale: string = DEFAULT_LOCALE): Promise<Post | null> {
  try {
    // 1. Direct query in requested locale
    const res = await fetchStrapi<StrapiResponse<Post[]>>('/posts', {
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

    // 2. If not found directly in requested locale, look for post by slug in default locale
    // to find its documentId and fetch its localized variant
    if (locale !== DEFAULT_LOCALE) {
      const fallbackRes = await fetchStrapi<StrapiResponse<Post[]>>('/posts', {
        params: {
          'filters[slug][$eq]': slug,
          locale: DEFAULT_LOCALE,
          populate: '*',
        },
        next: { revalidate: 10 },
      });

      if (fallbackRes?.data && Array.isArray(fallbackRes.data) && fallbackRes.data.length > 0) {
        const defaultPost = fallbackRes.data[0];
        if (defaultPost.documentId) {
          // Attempt to find the localized version for this document
          const localizedDocRes = await fetchStrapi<StrapiResponse<Post[]>>('/posts', {
            params: {
              'filters[documentId][$eq]': defaultPost.documentId,
              locale,
              populate: '*',
            },
            next: { revalidate: 10 },
          });

          if (localizedDocRes?.data && Array.isArray(localizedDocRes.data) && localizedDocRes.data.length > 0) {
            return localizedDocRes.data[0];
          }
        }

        // Return default locale post as fallback if localized translation not found, flagging translationPending
        return {
          ...defaultPost,
          translationPending: true,
        };
      }
    }
  } catch { }

  return null;
}

export async function getFeaturedPosts(limit = 2, locale: string = DEFAULT_LOCALE): Promise<Post[]> {
  const result = await getPosts({ featured: true, pageSize: limit, locale });
  if (result.posts.length > 0) return result.posts;

  const latest = await getPosts({ pageSize: limit, locale });
  if (latest.posts.length > 0) return latest.posts;

  return [];
}

export async function getTrendingPosts(limit = 4, locale: string = DEFAULT_LOCALE): Promise<Post[]> {
  const result = await getPosts({ trending: true, pageSize: limit, locale });
  if (result.posts.length > 0) return result.posts;

  return [];
}

export async function getRelatedPosts(categorySlug?: string, currentPostId?: number, limit = 3, locale: string = DEFAULT_LOCALE): Promise<Post[]> {
  if (categorySlug) {
    const result = await getPosts({ category: categorySlug, pageSize: limit + 1, locale });
    const related = result.posts.filter((p) => p.id !== currentPostId).slice(0, limit);
    if (related.length > 0) return related;
  }

  const latest = await getPosts({ pageSize: limit + 1, locale });
  const related = latest.posts.filter((p) => p.id !== currentPostId).slice(0, limit);
  return related;
}
