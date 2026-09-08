import * as React from 'react';
import Link from 'next/link';
import { ArrowRight, Layers } from 'lucide-react';
import { Category } from '@/types/category';
import { Image } from '@/components/ui/Image';
import { getStrapiMediaUrl } from '@/lib/strapi/media';

interface CategoryCardProps {
  category: Category;
  locale?: string;
}

export function CategoryCard({ category, locale = 'en' }: CategoryCardProps) {
  const imageUrl = getStrapiMediaUrl(category.image);

  return (
    <Link
      href={`/${locale}/category/${category.slug}`}
      className="group relative overflow-hidden rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/70 dark:bg-zinc-900/70 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/10 hover:border-indigo-500/30 flex flex-col justify-between"
    >
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          {imageUrl ? (
            <div className="w-12 h-12 rounded-xl overflow-hidden shadow-md">
              <Image src={imageUrl} alt={category.name} width={48} height={48} className="w-full h-full object-cover" />
            </div>
          ) : (
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-md"
              style={{ backgroundColor: category.color || '#6366f1' }}
            >
              <Layers className="w-6 h-6" />
            </div>
          )}
          {category.postCount !== undefined && (
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400">
              {category.postCount} {category.postCount === 1 ? 'article' : 'articles'}
            </span>
          )}
        </div>

        <div>
          <h3 className="text-lg font-bold text-zinc-900 dark:text-white group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
            {category.name}
          </h3>
          {category.description && (
            <p className="mt-1.5 text-xs text-zinc-500 dark:text-zinc-400 line-clamp-2 leading-relaxed">
              {category.description}
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 flex items-center gap-1.5 text-xs font-semibold text-indigo-600 dark:text-indigo-400 group-hover:gap-2.5 transition-all">
        Browse Category <ArrowRight className="w-3.5 h-3.5" />
      </div>
    </Link>
  );
}
