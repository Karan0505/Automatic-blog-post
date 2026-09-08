import * as React from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeft } from 'lucide-react';
import { getAuthorBySlug } from '@/lib/strapi/authors';
import { getPosts } from '@/lib/strapi/posts';
import { AuthorProfile } from '@/components/author/AuthorProfile';
import { BlogGrid } from '@/components/blog/BlogGrid';
import { Pagination } from '@/components/blog/Pagination';

interface AuthorPageProps {
  params: Promise<{
    locale: string;
    slug: string;
  }>;
  searchParams: Promise<{
    page?: string;
  }>;
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug, locale } = await params;
  const author = await getAuthorBySlug(slug, locale);

  if (!author) {
    return {
      title: 'Author Not Found',
    };
  }

  return {
    title: `${author.name} — Author Profile & Publications`,
    description: author.bio || `Read articles and technical publications written by ${author.name}.`,
  };
}

export const revalidate = 10;

export default async function AuthorPage({ params, searchParams }: AuthorPageProps) {
  const { slug, locale } = await params;
  const sParams = await searchParams;
  const page = Number(sParams.page) || 1;

  const author = await getAuthorBySlug(slug, locale);

  if (!author) {
    notFound();
  }

  const postsData = await getPosts({ author: author.slug, page, pageSize: 6, locale });

  return (
    <div className="space-y-10">
      <Link
        href={`/${locale}/blog`}
        className="inline-flex items-center gap-1.5 text-xs text-zinc-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Articles
      </Link>

      <AuthorProfile author={author} postCount={postsData.pagination.total} />

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white tracking-tight">
          Articles by {author.name}
        </h2>
        <BlogGrid posts={postsData.posts} columns={3} locale={locale} />
      </div>

      <Pagination
        currentPage={postsData.pagination.page}
        totalPages={postsData.pagination.pageCount}
      />
    </div>
  );
}
