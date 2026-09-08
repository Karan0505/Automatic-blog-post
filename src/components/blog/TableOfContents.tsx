'use client';

import * as React from 'react';
import { List, ChevronDown } from 'lucide-react';
import { TableOfContentsItem } from '@/types/blog';

interface TableOfContentsProps {
  items: TableOfContentsItem[];
  title?: string;
}

export function TableOfContents({ items, title = 'Table of Contents' }: TableOfContentsProps) {
  const [activeId, setActiveId] = React.useState<string>('');
  const [isOpenMobile, setIsOpenMobile] = React.useState<boolean>(false);

  // ScrollSpy to track active heading as user scrolls
  React.useEffect(() => {
    if (!items || items.length === 0) return;

    const headingElements = items
      .map((item) => document.getElementById(item.anchor))
      .filter((el): el is HTMLElement => el !== null);

    if (headingElements.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
        }
      },
      {
        rootMargin: '-80px 0px -60% 0px',
        threshold: [0, 1],
      }
    );

    headingElements.forEach((el) => observer.observe(el));

    // Handle direct hash navigation on page load
    if (window.location.hash) {
      const hashId = window.location.hash.replace('#', '');
      setActiveId(hashId);
    }

    return () => {
      observer.disconnect();
    };
  }, [items]);

  const scrollToAnchor = (e: React.MouseEvent<HTMLAnchorElement>, anchor: string) => {
    e.preventDefault();
    const element = document.getElementById(anchor);
    if (element) {
      const headerOffset = 90;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });

      window.history.pushState(null, '', `#${anchor}`);
      setActiveId(anchor);
      setIsOpenMobile(false);
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <>
      {/* Mobile Collapsible TOC */}
      <div className="lg:hidden col-span-1 mb-2 rounded-2xl bg-zinc-50 dark:bg-zinc-900/70 border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm">
        <button
          type="button"
          onClick={() => setIsOpenMobile((prev) => !prev)}
          className="w-full px-4 py-3 flex items-center justify-between text-left font-bold text-xs uppercase tracking-wider text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/50 transition-colors"
        >
          <span className="flex items-center gap-2">
            <List className="w-4 h-4 text-indigo-500" />
            {title}
          </span>
          <ChevronDown
            className={`w-4 h-4 text-zinc-400 transition-transform duration-200 ${
              isOpenMobile ? 'rotate-180' : ''
            }`}
          />
        </button>

        {isOpenMobile && (
          <nav className="px-4 pb-4 pt-1 space-y-1 text-xs border-t border-zinc-200/60 dark:border-zinc-800/60">
            {items.map((item, idx) => {
              const isActive = activeId === item.anchor;
              return (
                <a
                  key={idx}
                  href={`#${item.anchor}`}
                  onClick={(e) => scrollToAnchor(e, item.anchor)}
                  className={`block py-1.5 px-2 rounded-lg transition-colors ${
                    item.level === 3 ? 'ml-3 text-[11px]' : ''
                  } ${
                    isActive
                      ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40'
                  }`}
                >
                  {item.title}
                </a>
              );
            })}
          </nav>
        )}
      </div>

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden lg:block lg:col-span-4 space-y-4 sticky top-28 self-start p-5 rounded-2xl bg-zinc-50 dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800 backdrop-blur-md shadow-xs">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
          <List className="w-4 h-4 text-indigo-500" />
          <span>{title}</span>
        </div>
        <nav className="space-y-1 text-xs">
          {items.map((item, idx) => {
            const isActive = activeId === item.anchor;
            return (
              <a
                key={idx}
                href={`#${item.anchor}`}
                onClick={(e) => scrollToAnchor(e, item.anchor)}
                className={`block py-1.5 px-2.5 rounded-lg transition-all duration-200 ${
                  item.level === 3 ? 'ml-3 text-[11px]' : ''
                } ${
                  isActive
                    ? 'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 font-semibold shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-indigo-600 dark:hover:text-indigo-400 hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40'
                }`}
              >
                {item.title}
              </a>
            );
          })}
        </nav>
      </aside>
    </>
  );
}
