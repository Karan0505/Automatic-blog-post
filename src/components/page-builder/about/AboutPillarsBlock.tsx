import * as React from 'react';
import { Zap } from 'lucide-react';
import { AboutPillarsBlockData, FeatureCardItem } from '@/types/page';
import { DynamicIcon } from '@/components/ui/DynamicIcon';

interface AboutPillarsBlockProps {
  block: AboutPillarsBlockData;
}

const bgColors = [
  'bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400',
  'bg-violet-50 dark:bg-violet-950/60 text-violet-600 dark:text-violet-400',
  'bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400',
  'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400',
  'bg-rose-50 dark:bg-rose-950/60 text-rose-600 dark:text-rose-400',
  'bg-sky-50 dark:bg-sky-950/60 text-sky-600 dark:text-sky-400',
];

const defaultPillars: FeatureCardItem[] = [
  {
    icon: 'Zap',
    title: 'Velocity with Quality',
    description: 'We explore architectures that allow small teams to build world-class web experiences without compounding tech debt.',
  },
  {
    icon: 'Terminal',
    title: 'Decoupled Systems',
    description: 'Headless CMS workflows with Strapi and Next.js give marketing and engineering teams complete autonomy.',
  },
  {
    icon: 'Shield',
    title: 'Production Proven',
    description: 'Every pattern and snippet featured in our publications is tested against real-world production constraints.',
  },
];

export function AboutPillarsBlock({ block }: AboutPillarsBlockProps) {
  const pillars = block.pillars && block.pillars.length > 0 ? block.pillars : defaultPillars;

  return (
    <section className="space-y-6">
      {block.title && (
        <h2 className="text-2xl font-bold text-center text-zinc-900 dark:text-white">
          {block.title}
        </h2>
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pillars.map((pillar, idx) => {
          const colorClass = bgColors[idx % bgColors.length];

          return (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-white/70 dark:bg-zinc-900/70 border border-zinc-200/80 dark:border-zinc-800/80 space-y-3 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 hover:border-indigo-500/30"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${colorClass}`}>
                <DynamicIcon name={pillar.icon} fallback={Zap} className="w-5 h-5" />
              </div>
              <h3 className="text-base font-bold text-zinc-900 dark:text-white">
                {pillar.title}
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                {pillar.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
