'use client';

import * as React from 'react';
import Link from 'next/link';
import { Search, Menu, X, Sparkles, Compass } from 'lucide-react';
import { Navbar } from '../Navbar';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { Button } from '@/components/ui/Button';
import { HeaderData } from '@/types/header';
import { getDictionary } from '@/lib/i18n/dictionary';

import { StrapiLocale } from '@/lib/strapi/locales';

interface HeaderProps {
  headerData?: HeaderData | null;
  locale?: string;
  initialLocales?: StrapiLocale[];
}

export function Header({ headerData, locale = 'en', initialLocales }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const dict = getDictionary(locale);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const siteName = headerData?.siteName || 'CHRONICLE';
  const siteSubtitle = headerData?.siteSubtitle || (locale.startsWith('gu') ? 'ટેક & આર્કિટેક્ચર' : 'Tech & Architecture');
  const ctaText = headerData?.ctaButtonText || dict.exploreStories;
  let ctaLink = headerData?.ctaButtonLink || `/${locale}/blog`;
  if (!ctaLink.startsWith(`/${locale}`)) {
    ctaLink = ctaLink === '/' ? `/${locale}` : `/${locale}${ctaLink}`;
  }

  const navLinks = headerData?.navLinks || [
    { label: dict.home, href: `/${locale}` },
    { label: dict.articles, href: `/${locale}/blog` },
    { label: dict.about, href: `/${locale}/about` },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? 'bg-white/80 dark:bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-200/60 dark:border-zinc-800/60 shadow-sm shadow-zinc-900/5'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 sm:h-20 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <Link href={`/${locale}`} className="flex items-center gap-2.5 group">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25 group-hover:scale-105 transition-transform duration-300">
            <Compass className="w-5 h-5 transition-transform group-hover:rotate-45 duration-500" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-lg tracking-tight text-zinc-900 dark:text-white flex items-center gap-1.5">
              {siteName}
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-indigo-500 animate-ping" />
            </span>
            <span className="text-[10px] font-medium tracking-widest text-zinc-400 dark:text-zinc-500 uppercase">
              {siteSubtitle}
            </span>
          </div>
        </Link>

        {/* Desktop Navbar */}
        <Navbar links={navLinks} locale={locale} />

        {/* Right CTA Actions */}
        <div className="flex items-center gap-2.5 sm:gap-3">
          {/* Dynamic Language Switcher */}
          <LanguageSwitcher currentLocale={locale} initialLocales={initialLocales} />

          <Link href={`/${locale}/search`}>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
              aria-label="Search"
            >
              <Search className="w-4 h-4" />
            </Button>
          </Link>

          <Link href={ctaLink} className="hidden sm:inline-flex">
            <Button variant="primary" size="sm" className="rounded-full">
              <Sparkles className="w-3.5 h-3.5 mr-1 text-indigo-200" />
              {ctaText}
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-xl text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white/95 dark:bg-zinc-950/95 backdrop-blur-2xl border-b border-zinc-200 dark:border-zinc-800 px-6 py-6 space-y-4 animate-in slide-in-from-top-4 duration-300">
          <div className="flex flex-col space-y-2">
            {navLinks.map((link, idx) => (
              <Link
                key={link.id || idx}
                href={link.href}
                target={link.isExternal ? '_blank' : undefined}
                rel={link.isExternal ? 'noopener noreferrer' : undefined}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 text-sm font-medium rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-900"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="pt-4 border-t border-zinc-200 dark:border-zinc-800 flex flex-col gap-2">
            <Link href="/search" onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" className="w-full justify-center">
                <Search className="w-4 h-4 mr-2" />
                Search Articles
              </Button>
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
