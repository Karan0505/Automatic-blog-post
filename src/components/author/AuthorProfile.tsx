import * as React from 'react';
import { Author } from '@/types/author';
import { Image } from '@/components/ui/Image';
import { getStrapiMediaUrl } from '@/lib/strapi/media';
import { Globe, BookOpen, Mail } from 'lucide-react';
import { TwitterIcon, GithubIcon, LinkedinIcon } from '@/components/ui/Icons';

interface AuthorProfileProps {
  author: Author;
  postCount?: number;
}

export function AuthorProfile({ author, postCount }: AuthorProfileProps) {
  const avatarUrl = getStrapiMediaUrl(author.avatar);


  return (
    <div className="relative overflow-hidden rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-gradient-to-b from-white/90 via-white/60 to-white/40 dark:from-zinc-900/90 dark:via-zinc-900/60 dark:to-zinc-900/40 p-8 sm:p-10 backdrop-blur-xl mb-12 shadow-xl shadow-indigo-500/5">
      <div className="absolute top-0 right-0 w-96 h-96 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />

      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden ring-4 ring-indigo-500/20 shadow-xl shrink-0">
          <Image
            src={avatarUrl}
            alt={author.name}
            width={128}
            height={128}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 text-center md:text-left space-y-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 border border-indigo-200 dark:border-indigo-800 text-xs font-semibold text-indigo-600 dark:text-indigo-400 mb-2">
              <BookOpen className="w-3.5 h-3.5" />
              Verified Author
            </div>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              {author.name}
            </h1>
            {author.role && (
              <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400 mt-1">
                {author.role}
              </p>
            )}
          </div>

          {author.bio && (
            <p className="text-sm text-zinc-600 dark:text-zinc-300 max-w-2xl leading-relaxed">
              {author.bio}
            </p>
          )}

          <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 pt-2">
            {author.email && (
              <a
                href={`mailto:${author.email}`}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-200 transition-colors"
              >
                <Mail className="w-3.5 h-3.5" />
                Contact
              </a>
            )}

            {author.socialLinks?.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 text-xs font-medium text-zinc-700 dark:text-zinc-200 transition-colors"
              >
                {link.platform === 'twitter' && <TwitterIcon className="w-3.5 h-3.5" />}
                {link.platform === 'github' && <GithubIcon className="w-3.5 h-3.5" />}
                {link.platform === 'linkedin' && <LinkedinIcon className="w-3.5 h-3.5" />}
                {link.platform === 'website' && <Globe className="w-3.5 h-3.5" />}
                <span className="capitalize">{link.platform}</span>
              </a>
            ))}

            {postCount !== undefined && (
              <span className="text-xs text-zinc-400 font-medium ml-auto">
                {postCount} {postCount === 1 ? 'publication' : 'publications'}
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
