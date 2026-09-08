import { NextRequest, NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import crypto from 'crypto';

const REVALIDATION_SECRET = process.env.REVALIDATION_SECRET || 'chronicle-secure-revalidation-secret-key-2026';
const MAX_TIMESTAMP_TOLERANCE_MS = 5 * 60 * 1000; // 5 minutes

export async function POST(request: NextRequest) {
  try {
    const rawBody = await request.text();
    const signature = request.headers.get('x-strapi-signature');
    const timestamp = request.headers.get('x-strapi-timestamp');
    const legacyToken = request.headers.get('x-strapi-revalidate-token');

    // 1. Signature & Replay Verification
    if (signature && timestamp) {
      const parsedTime = Number(timestamp);
      const currentTime = Date.now();

      if (isNaN(parsedTime) || Math.abs(currentTime - parsedTime) > MAX_TIMESTAMP_TOLERANCE_MS) {
        return NextResponse.json(
          { message: 'Request timestamp expired or out of tolerance window.' },
          { status: 401 }
        );
      }

      const computedSignature = crypto
        .createHmac('sha256', REVALIDATION_SECRET)
        .update(rawBody)
        .digest('hex');

      if (computedSignature !== signature) {
        return NextResponse.json(
          { message: 'Invalid HMAC signature.' },
          { status: 401 }
        );
      }
    } else if (legacyToken) {
      if (legacyToken !== REVALIDATION_SECRET) {
        return NextResponse.json({ message: 'Invalid revalidation token.' }, { status: 401 });
      }
    } else if (process.env.NODE_ENV === 'production') {
      return NextResponse.json({ message: 'Missing authentication headers.' }, { status: 401 });
    }

    const body = rawBody ? JSON.parse(rawBody) : {};
    const { model, entry, path, locale, slug } = body;

    // Direct path revalidation
    if (path) {
      revalidatePath(path);
    }

    if (locale && slug) {
      revalidatePath(`/${locale}/blog/${slug}`);
      revalidatePath(`/${locale}/blog`);
      revalidatePath(`/${locale}`);
    }

    if (model === 'post' || entry?.slug) {
      const itemSlug = entry?.slug || slug;
      revalidatePath('/');
      revalidatePath('/blog');
      revalidatePath('/en/blog');
      revalidatePath('/gu-IN/blog');
      if (itemSlug) {
        revalidatePath(`/blog/${itemSlug}`);
        revalidatePath(`/en/blog/${itemSlug}`);
        revalidatePath(`/gu-IN/blog/${itemSlug}`);
      }
    } else {
      revalidatePath('/', 'layout');
    }

    return NextResponse.json({
      revalidated: true,
      timestamp: Date.now(),
      path: path || `/${locale || 'en'}/blog/${slug || ''}`,
    });
  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    return NextResponse.json(
      { message: 'Error revalidating', error: errorMessage },
      { status: 500 }
    );
  }
}
