import * as React from 'react';
import Link from 'next/link';
import { Author } from '@/types/author';
import { Image } from '@/components/ui/Image';
import { getStrapiMediaUrl } from '@/lib/strapi/media';
import { Globe } from 'lucide-react';
import { TwitterIcon, GithubIcon, LinkedinIcon } from '@/components/ui/Icons';

interface AuthorCardProps {
  author: Author;
  locale?: string;
}

export function AuthorCard({ author, locale = 'en' }: AuthorCardProps) {
  const avatarUrl = getStrapiMediaUrl(author.avatar);


  return (
    <div className="rounded-2xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 p-6 backdrop-blur-md transition-all hover:border-indigo-500/30 flex flex-col sm:flex-row items-center sm:items-start gap-5">
      <Link href={`/${locale}/author/${author.slug}`} className="shrink-0 group">
        <div className="w-16 h-16 rounded-full overflow-hidden ring-2 ring-indigo-500/20 group-hover:ring-indigo-500 transition-all">
          <Image
            src={avatarUrl}
            alt={author.name}
            width={64}
            height={64}
            className="w-full h-full object-cover"
          />
        </div>
      </Link>

      <div className="flex-1 text-center sm:text-left space-y-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <Link
              href={`/${locale}/author/${author.slug}`}
              className="text-base font-bold text-zinc-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {author.name}
            </Link>
            {author.role && (
              <p className="text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                {author.role}
              </p>
            )}
          </div>

          {author.socialLinks && author.socialLinks.length > 0 && (
            <div className="flex items-center justify-center sm:justify-end gap-2">
              {author.socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noreferrer"
                  className="w-7 h-7 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 flex items-center justify-center text-zinc-500 hover:text-zinc-900 dark:hover:text-white transition-colors"
                >
                  {link.platform === 'twitter' && <TwitterIcon className="w-3.5 h-3.5" />}
                  {link.platform === 'github' && <GithubIcon className="w-3.5 h-3.5" />}
                  {link.platform === 'linkedin' && <LinkedinIcon className="w-3.5 h-3.5" />}
                  {link.platform === 'website' && <Globe className="w-3.5 h-3.5" />}
                </a>
              ))}
            </div>
          )}
        </div>

        {author.bio && (
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed line-clamp-2">
            {author.bio}
          </p>
        )}
      </div>
    </div>
  );
}
