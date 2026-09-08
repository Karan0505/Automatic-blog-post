'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils/cn';
import { NavLinkItem } from '@/types/header';
import { getDictionary } from '@/lib/i18n/dictionary';

interface NavbarProps {
  links?: NavLinkItem[];
  locale?: string;
}

export function Navbar({ links, locale = 'en' }: NavbarProps) {
  const pathname = usePathname();
  const dict = getDictionary(locale);

  const defaultLinks: NavLinkItem[] = [
    { label: dict.home, href: `/${locale}` },
    { label: dict.articles, href: `/${locale}/blog` },
    { label: dict.about, href: `/${locale}/about` },
  ];

  const rawLinks = links && links.length > 0 ? links : defaultLinks;

  // Ensure internal href links have locale prefix
  const navLinks = rawLinks.map((link) => {
    let href = link.href;
    if (!link.isExternal && !href.startsWith(`/${locale}`)) {
      href = href === '/' ? `/${locale}` : `/${locale}${href}`;
    }
    return { ...link, href };
  });

  return (
    <nav className="hidden md:flex items-center gap-1 bg-zinc-100/80 dark:bg-zinc-800/60 p-1.5 rounded-full border border-zinc-200/60 dark:border-zinc-700/50 backdrop-blur-md">
      {navLinks.map((link, idx) => {
        const isActive =
          link.href === `/${locale}`
            ? pathname === `/${locale}` || pathname === '/'
            : pathname.startsWith(link.href);

        return (
          <Link
            key={link.id || idx}
            href={link.href}
            target={link.isExternal ? '_blank' : undefined}
            rel={link.isExternal ? 'noopener noreferrer' : undefined}
            className={cn(
              'px-4 py-1.5 text-xs font-medium rounded-full transition-all duration-200',
              isActive
                ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm font-semibold'
                : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white hover:bg-white/40 dark:hover:bg-white/5'
            )}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
