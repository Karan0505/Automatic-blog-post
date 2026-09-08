'use client';

import * as React from 'react';
import Link from 'next/link';
import { Compass, ArrowUpRight, Mail } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { TwitterIcon, GithubIcon, LinkedinIcon } from '@/components/ui/Icons';
import { FooterData } from '@/types/footer';

interface FooterProps {
  footerData?: FooterData | null;
  locale?: string;
}

export function Footer({ footerData, locale = 'en' }: FooterProps) {
  const [subscribed, setSubscribed] = React.useState(false);
  const [email, setEmail] = React.useState('');

  const footerDesc =
    footerData?.description ||
    (locale.startsWith('gu')
      ? 'એક સ્વતંત્ર ટેક પબ્લિકેશન જે હાઇ-વેલોસિટી સોફ્ટવેર એન્જિનિયરિંગ અને આધુનિક હેડલેસ આર્કિટેક્ચરની શોધ કરે છે.'
      : 'An independent tech publication exploring high-velocity software engineering, modern headless content management, and avant-garde design systems.');

  const col1Title = footerData?.column1Title || (locale.startsWith('gu') ? 'નેવિગેશન' : 'Navigation');
  const rawCol1Links =
    footerData?.column1Links && footerData.column1Links.length > 0
      ? footerData.column1Links
      : [
          { label: locale.startsWith('gu') ? 'મુખ્ય પૃષ્ઠ' : 'Home', href: `/${locale}` },
          { label: locale.startsWith('gu') ? 'બધા લેખો' : 'All Articles', href: `/${locale}/blog` },
          { label: locale.startsWith('gu') ? 'અમારા વિશે' : 'About Us', href: `/${locale}/about` },
          { label: locale.startsWith('gu') ? 'શોધો' : 'Search', href: `/${locale}/search` },
        ];

  const col1Links = rawCol1Links.map((link) => {
    let href = link.href;
    if (!link.isExternal && !href.startsWith(`/${locale}`)) {
      href = href === '/' ? `/${locale}` : `/${locale}${href}`;
    }
    return { ...link, href };
  });

  const col2Title = footerData?.column2Title || (locale.startsWith('gu') ? 'શોધો' : 'Discover');
  const rawCol2Links =
    footerData?.column2Links && footerData.column2Links.length > 0
      ? footerData.column2Links
      : [
          { label: locale.startsWith('gu') ? 'બધા પોસ્ટ્સ' : 'All Posts', href: `/${locale}/blog` },
          { label: locale.startsWith('gu') ? 'સંપાદકીય વિશે' : 'About Editorial', href: `/${locale}/about` },
          { label: locale.startsWith('gu') ? 'વિષયો શોધો' : 'Search Topics', href: `/${locale}/search` },
        ];

  const col2Links = rawCol2Links.map((link) => {
    let href = link.href;
    if (!link.isExternal && !href.startsWith(`/${locale}`)) {
      href = href === '/' ? `/${locale}` : `/${locale}${href}`;
    }
    return { ...link, href };
  });

  const newsletterTitle = footerData?.newsletterTitle || 'Dispatch';
  const newsletterDesc =
    footerData?.newsletterDescription ||
    'Curated articles and engineering blueprints delivered to your inbox every Thursday.';
  const newsletterBtn = footerData?.newsletterButtonText || 'Subscribe Free';
  const copyright =
    footerData?.copyrightText || 'Chronicle Media Inc. All rights reserved.';

  const twitter = footerData?.twitterUrl || 'https://twitter.com';
  const github = footerData?.githubUrl || 'https://github.com';
  const linkedin = footerData?.linkedinUrl || 'https://linkedin.com';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="bg-zinc-950 text-zinc-300 border-t border-zinc-900 pt-16 pb-12 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 lg:gap-12 pb-12 border-b border-zinc-900">
          {/* Brand & Mission */}
          <div className="md:col-span-5 space-y-4">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-indigo-500 to-violet-500 flex items-center justify-center text-white shadow-md shadow-indigo-500/25">
                <Compass className="w-5 h-5" />
              </div>
              <span className="font-bold text-lg tracking-tight text-white">CHRONICLE</span>
            </Link>
            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              {footerDesc}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {twitter && (
                <a
                  href={twitter}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                  aria-label="Twitter"
                >
                  <TwitterIcon className="w-4 h-4" />
                </a>
              )}
              {github && (
                <a
                  href={github}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                  aria-label="GitHub"
                >
                  <GithubIcon className="w-4 h-4" />
                </a>
              )}
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noreferrer"
                  className="w-9 h-9 rounded-full bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors"
                  aria-label="LinkedIn"
                >
                  <LinkedinIcon className="w-4 h-4" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Navigation Column 1 */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{col1Title}</p>
            <ul className="space-y-2 text-sm">
              {col1Links.map((link, idx) => (
                <li key={link.id || idx}>
                  <Link
                    href={link.href}
                    target={link.isExternal ? '_blank' : undefined}
                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2 */}
          <div className="md:col-span-2 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{col2Title}</p>
            <ul className="space-y-2 text-sm">
              {col2Links.map((link, idx) => (
                <li key={link.id || idx}>
                  <Link
                    href={link.href}
                    target={link.isExternal ? '_blank' : undefined}
                    rel={link.isExternal ? 'noopener noreferrer' : undefined}
                    className="hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Box */}
          <div className="md:col-span-3 space-y-3">
            <p className="text-xs font-semibold uppercase tracking-wider text-zinc-400">{newsletterTitle}</p>
            <p className="text-xs text-zinc-400 leading-relaxed">
              {newsletterDesc}
            </p>
            {subscribed ? (
              <div className="p-3 rounded-xl bg-indigo-950/60 border border-indigo-800 text-xs text-indigo-300 font-medium">
                ✓ Thank you for subscribing!
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-2">
                <div className="relative">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    placeholder="name@work-email.com"
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder:text-zinc-500 focus:outline-none focus:border-indigo-500 transition-colors"
                  />
                </div>
                <Button type="submit" variant="primary" size="sm" className="w-full justify-center">
                  <Mail className="w-3.5 h-3.5 mr-1.5" />
                  {newsletterBtn}
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500">
          <p>© {new Date().getFullYear()} {copyright}</p>
          <div className="flex items-center gap-6">
            <span className="inline-flex items-center gap-1 hover:text-zinc-400">
              Strapi 5 Backend <ArrowUpRight className="w-3 h-3" />
            </span>
            <span className="inline-flex items-center gap-1 hover:text-zinc-400">
              Next.js 15 Frontend <ArrowUpRight className="w-3 h-3" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
