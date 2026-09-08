import { Post } from '@/types/blog';
import { SITE_CONFIG } from '@/lib/constants';

interface JsonLdProps {
  post: Post;
}

export function JsonLd({ post }: JsonLdProps) {
  const imageUrl = typeof post.coverImage === 'string' ? post.coverImage : post.coverImage?.url || SITE_CONFIG.ogImage;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    image: imageUrl,
    datePublished: post.publishedAt || post.createdAt,
    dateModified: post.updatedAt || post.publishedAt || post.createdAt,
    author: {
      '@type': 'Person',
      name: post.author?.name || SITE_CONFIG.author,
      url: post.author?.slug ? `${SITE_CONFIG.url}/author/${post.author.slug}` : undefined,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/logo.svg`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_CONFIG.url}/blog/${post.slug}`,
    },
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
