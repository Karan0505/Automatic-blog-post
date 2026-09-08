import * as React from 'react';
import { RichTextBlockData } from '@/types/page';
import { BlogContent } from '@/components/blog/BlogContent';

interface RichTextBlockProps {
  block: RichTextBlockData;
}

export function RichTextBlock({ block }: RichTextBlockProps) {
  return (
    <section className="max-w-4xl mx-auto space-y-6">
      {block.title && (
        <h2 className="text-2xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          {block.title}
        </h2>
      )}
      <BlogContent content={block.content} />
    </section>
  );
}
