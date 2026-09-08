'use client';

import * as React from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Globe, ChevronDown, Check } from 'lucide-react';
import { StrapiLocale } from '@/lib/strapi/locales';

interface LanguageSwitcherProps {
  currentLocale?: string;
  initialLocales?: StrapiLocale[];
}

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_API_URL || 'http://127.0.0.1:1337';

export function LanguageSwitcher({ currentLocale = 'en', initialLocales }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [fetchedLocales, setFetchedLocales] = React.useState<StrapiLocale[]>([]);
  const locales = (initialLocales && initialLocales.length > 0) ? initialLocales : fetchedLocales;
  const [isOpen, setIsOpen] = React.useState(false);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const fetchedRef = React.useRef(false);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch locales dynamically if not provided initially
  React.useEffect(() => {
    if (initialLocales && initialLocales.length > 0) return;
    if (fetchedRef.current) return;
    fetchedRef.current = true;

    fetch(`${STRAPI_URL}/api/i18n/locales`)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          setFetchedLocales(data);
        }
      })
      .catch((err) => {
        console.error('Failed to load locales:', err);
      });
  }, [initialLocales]);

  const activeLocaleObj = locales.find((l) => l.code === currentLocale) || {
    name: currentLocale.toUpperCase(),
    code: currentLocale,
  };

  const handleSelectLocale = (newLocale: string) => {
    setIsOpen(false);
    if (newLocale === currentLocale) return;

    let segments = pathname.split('/').filter(Boolean);

    // Strip any leading locale prefix segment(s) cleanly
    while (
      segments.length > 0 &&
      (segments[0] === currentLocale ||
        locales.some((l) => l.code.toLowerCase() === segments[0].toLowerCase()) ||
        /^[a-zA-Z]{2,3}(-[a-zA-Z0-9]+)*$/.test(segments[0]))
    ) {
      segments.shift();
    }

    const newPath = `/${newLocale}${segments.length > 0 ? `/${segments.join('/')}` : ''}`;
    router.push(newPath);
  };

  if (locales.length <= 1) {
    return null; // No need to show dropdown if only 1 language configured
  }

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-full bg-zinc-100 dark:bg-zinc-800/80 hover:bg-zinc-200 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-200 border border-zinc-200/80 dark:border-zinc-700/60 transition-all duration-200 shadow-sm"
        aria-label="Select Language"
      >
        <Globe className="w-3.5 h-3.5 text-indigo-500" />
        <span>{activeLocaleObj.name.split(' ')[0]}</span>
        <ChevronDown className={`w-3 h-3 text-zinc-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl bg-white dark:bg-zinc-900 shadow-xl shadow-zinc-900/10 border border-zinc-200/80 dark:border-zinc-800 py-1.5 z-50 animate-in fade-in-0 zoom-in-95 duration-150">
          <div className="px-3 py-1.5 border-b border-zinc-100 dark:border-zinc-800">
            <span className="text-[10px] font-semibold tracking-wider uppercase text-zinc-400 dark:text-zinc-500">
              Language
            </span>
          </div>

          <div className="py-1 max-h-60 overflow-y-auto">
            {locales.map((loc) => {
              const isSelected = loc.code === currentLocale;
              return (
                <button
                  key={loc.code}
                  type="button"
                  onClick={() => handleSelectLocale(loc.code)}
                  className={`w-full flex items-center justify-between px-3 py-2 text-xs font-medium transition-colors ${
                    isSelected
                      ? 'text-indigo-600 dark:text-indigo-400 bg-indigo-50/50 dark:bg-indigo-950/30'
                      : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="font-semibold uppercase text-[10px] px-1.5 py-0.5 rounded bg-zinc-200/70 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300">
                      {loc.code}
                    </span>
                    <span>{loc.name}</span>
                  </div>
                  {isSelected && <Check className="w-3.5 h-3.5 text-indigo-600 dark:text-indigo-400" />}
                </button>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
