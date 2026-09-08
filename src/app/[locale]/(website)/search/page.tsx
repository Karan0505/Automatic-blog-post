'use client';

import * as React from 'react';
import { useParams } from 'next/navigation';
import { Search } from 'lucide-react';
import { SearchBar } from '@/components/search/SearchBar';
import { SearchResults } from '@/components/search/SearchResults';
import { useDebounce } from '@/hooks/useDebounce';
import { Post } from '@/types/blog';
import { getPosts } from '@/lib/strapi/posts';

export default function SearchPage() {
  const params = useParams<{ locale?: string }>();
  const locale = params?.locale || 'en';

  const [query, setQuery] = React.useState('');
  const [results, setResults] = React.useState<Post[]>([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const debouncedQuery = useDebounce(query, 300);

  React.useEffect(() => {
    async function performSearch() {
      if (!debouncedQuery.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      try {
        const data = await getPosts({ search: debouncedQuery, pageSize: 12, locale });
        setResults(data.posts);
      } catch {
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    }

    performSearch();
  }, [debouncedQuery, locale]);

  return (
    <div className="max-w-5xl mx-auto space-y-10">
      {/* Search Header Banner */}
      <div className="text-center space-y-4 py-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400">
          <Search className="w-3.5 h-3.5" />
          Global Search
        </div>
        <h1 className="text-3xl sm:text-5xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Search the Knowledge Base
        </h1>
        <p className="text-sm sm:text-base text-zinc-500 dark:text-zinc-400 max-w-xl mx-auto">
          Find architectural guides, design system articles, and headless content strategies across all editions.
        </p>

        {/* Input Bar */}
        <div className="pt-4">
          <SearchBar
            value={query}
            onChange={setQuery}
            autoFocus
            placeholder="Type Next.js, Strapi, Micro-interactions, Architecture..."
          />
        </div>
      </div>

      {/* Results View */}
      <SearchResults posts={results} query={debouncedQuery} isLoading={isLoading} locale={locale} />
    </div>
  );
}
