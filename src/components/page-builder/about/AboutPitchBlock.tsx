import * as React from 'react';
import Link from 'next/link';
import { Mail } from 'lucide-react';
import { AboutPitchBlockData } from '@/types/page';
import { DynamicIcon } from '@/components/ui/DynamicIcon';
import { Button } from '@/components/ui/Button';

interface AboutPitchBlockProps {
  block: AboutPitchBlockData;
}

export function AboutPitchBlock({ block }: AboutPitchBlockProps) {
  const linkHref = block.buttonLink || 'mailto:editor@chronicle.dev';

  return (
    <section className="rounded-3xl border border-zinc-200/80 dark:border-zinc-800/80 bg-white/60 dark:bg-zinc-900/60 p-8 sm:p-10 backdrop-blur-xl text-center space-y-6 shadow-xl">
      <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center mx-auto">
        <DynamicIcon name={block.icon} fallback={Mail} className="w-6 h-6" />
      </div>
      <div className="space-y-2 max-w-lg mx-auto">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
          {block.title}
        </h2>
        {block.description && (
          <p className="text-xs sm:text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            {block.description}
          </p>
        )}
      </div>
      <div>
        <Link href={linkHref}>
          <Button variant="primary" size="lg" className="rounded-xl font-bold shadow-md shadow-indigo-500/20">
            <Mail className="w-4 h-4 mr-2" />
            {block.buttonText || 'Submit Editorial Pitch'}
          </Button>
        </Link>
      </div>
    </section>
  );
}
