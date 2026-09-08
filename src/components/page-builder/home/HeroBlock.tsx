import * as React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import { HeroBlockData } from '@/types/page';
import { Post } from '@/types/blog';
import { BlogHero } from '@/components/blog/BlogHero';
import { Button } from '@/components/ui/Button';

interface HeroBlockProps {
  block: HeroBlockData;
  posts?: Post[];
  locale?: string;
}

export function HeroBlock({ block, posts = [], locale = 'en' }: HeroBlockProps) {
  const heroPost = block.featuredPost || posts.find((p) => p.featured) || posts[0];

  if (heroPost) {
    return (
      <BlogHero
        post={heroPost}
        badge={block.badge}
        buttonText={block.buttonText || 'Read Full Story'}
        locale={locale}
      />
    );
  }

  const defaultButtonLink = block.buttonLink
    ? (block.buttonLink.startsWith(`/${locale}`) ? block.buttonLink : `/${locale}${block.buttonLink.startsWith('/') ? block.buttonLink : `/${block.buttonLink}`}`)
    : `/${locale}/blog`;

  // Fallback if no posts exist yet
  return (
    <section className="relative overflow-hidden rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-b from-white/90 via-white/50 to-white/30 dark:from-zinc-900/90 dark:via-zinc-900/50 dark:to-zinc-900/30 p-8 sm:p-12 backdrop-blur-xl shadow-2xl mb-16">
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="relative max-w-3xl space-y-6">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-indigo-600 text-white text-xs font-bold shadow-md">
          <Sparkles className="w-3.5 h-3.5" />
          {block.badge || 'Featured Editorial'}
        </span>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight leading-tight">
          {block.heading || 'Architectural Decisions in Modern Web Systems'}
        </h1>
        <p className="text-zinc-600 dark:text-zinc-300 text-base sm:text-lg leading-relaxed">
          {block.subheading || 'Deep dives into modern frontend ergonomics, headless CMS architectures, and high-performance design patterns.'}
        </p>
        <div className="pt-2">
          <Link href={defaultButtonLink}>
            <Button variant="primary" size="lg" className="rounded-xl font-bold">
              {block.buttonText || 'Explore Publications'} <ArrowRight className="w-4 h-4 ml-1.5" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
