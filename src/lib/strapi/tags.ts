import { fetchStrapi } from './client';
import { Tag } from '@/types/tag';
import { StrapiResponse } from '@/types/strapi';

export async function getTags(): Promise<Tag[]> {
  try {
    const res = await fetchStrapi<StrapiResponse<Tag[]>>('/tags', {
      params: {
        populate: '*',
      },
      next: { revalidate: 10 },
    });

    if (res?.data && Array.isArray(res.data)) {
      return res.data;
    }
  } catch {}

  return [];
}
