'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export function Pagination({ currentPage, totalPages }: PaginationProps) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (totalPages <= 1) return null;

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-2 mt-12" aria-label="Pagination">
      {currentPage > 1 ? (
        <Link href={createPageURL(currentPage - 1)}>
          <Button variant="outline" size="sm" className="rounded-xl gap-1">
            <ChevronLeft className="w-4 h-4" /> Previous
          </Button>
        </Link>
      ) : (
        <Button variant="outline" size="sm" className="rounded-xl gap-1" disabled>
          <ChevronLeft className="w-4 h-4" /> Previous
        </Button>
      )}

      <div className="flex items-center gap-1">
        {pages.map((page) => {
          const isActive = page === currentPage;
          return (
            <Link key={page} href={createPageURL(page)}>
              <button
                className={`w-9 h-9 rounded-xl text-xs font-bold transition-all ${
                  isActive
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/30'
                    : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                }`}
              >
                {page}
              </button>
            </Link>
          );
        })}
      </div>

      {currentPage < totalPages ? (
        <Link href={createPageURL(currentPage + 1)}>
          <Button variant="outline" size="sm" className="rounded-xl gap-1">
            Next <ChevronRight className="w-4 h-4" />
          </Button>
        </Link>
      ) : (
        <Button variant="outline" size="sm" className="rounded-xl gap-1" disabled>
          Next <ChevronRight className="w-4 h-4" />
        </Button>
      )}
    </nav>
  );
}
