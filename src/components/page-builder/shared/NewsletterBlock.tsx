'use client';

import * as React from 'react';
import { NewsletterCtaBlockData } from '@/types/page';
import { Button } from '@/components/ui/Button';

interface NewsletterBlockProps {
  block: NewsletterCtaBlockData;
}

export function NewsletterBlock({ block }: NewsletterBlockProps) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-indigo-500/20 bg-gradient-to-r from-indigo-900 via-indigo-950 to-slate-950 text-white p-8 sm:p-12 shadow-2xl">
      <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/20 rounded-full blur-3xl pointer-events-none" />
      <div className="relative max-w-2xl space-y-4">
        {block.badge && (
          <span className="text-xs font-bold uppercase tracking-widest text-indigo-400">
            {block.badge}
          </span>
        )}
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
          {block.title || 'Stay ahead of modern full-stack engineering trends'}
        </h2>
        {block.description && (
          <p className="text-sm text-indigo-200/80 leading-relaxed">
            {block.description}
          </p>
        )}
        <form onSubmit={(e) => e.preventDefault()} className="pt-2 flex flex-col sm:flex-row gap-3">
          <input
            type="email"
            placeholder={block.placeholder || 'Enter your professional email...'}
            className="flex-1 rounded-xl bg-white/10 border border-white/20 px-4 py-3 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-400 backdrop-blur-md"
          />
          <Button variant="primary" size="lg" className="rounded-xl font-bold">
            {block.buttonText || 'Subscribe Free'}
          </Button>
        </form>
      </div>
    </section>
  );
}
