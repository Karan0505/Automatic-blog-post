import * as React from 'react';
import { Metadata } from 'next';
import { getAuthors } from '@/lib/strapi/authors';
import { getAboutPage } from '@/lib/strapi/pages';
import { AboutPageBuilder } from '@/components/page-builder';
import { PageBlock } from '@/types/page';

export const metadata: Metadata = {
  title: 'About Chronicle — Engineering & Design Journal',
  description: 'Learn about the editorial vision, values, and contributors behind Chronicle.',
};

export const dynamic = 'force-dynamic';
export const revalidate = 0;

interface AboutPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AboutPage({ params }: AboutPageProps) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale || 'en';

  const [authors, aboutData] = await Promise.all([
    getAuthors(locale),
    getAboutPage(locale),
  ]);

  const fallbackBlocks: PageBlock[] = [
    {
      __component: 'about-blocks.about-hero',
      badge: 'Our Mission & Vision',
      title: 'Bridging Software Architecture & Design Craft',
      description:
        'Chronicle was founded to elevate technical writing into thoughtful, durable engineering artifacts. We unpack modern headless web architecture, design system engineering, and developer ergonomics.',
      icon: 'Compass',
    },
    {
      __component: 'about-blocks.about-pillars',
      title: 'Core Engineering Principles',
      pillars: [
        {
          icon: 'Zap',
          title: 'Velocity with Quality',
          description:
            'We explore architectures that allow small teams to build world-class web experiences without compounding tech debt.',
        },
        {
          icon: 'Terminal',
          title: 'Decoupled Systems',
          description:
            'Headless CMS workflows with Strapi and Next.js give marketing and engineering teams complete autonomy.',
        },
        {
          icon: 'Shield',
          title: 'Production Proven',
          description:
            'Every pattern and snippet featured in our publications is tested against real-world production constraints.',
        },
      ],
    },
    {
      __component: 'shared-blocks.featured-authors',
      title: 'Editorial Team',
      subtitle: 'Meet the engineers and designers directing our editorial standards.',
      limit: 6,
    },
    {
      __component: 'about-blocks.about-pitch',
      icon: 'Mail',
      title: 'Have a story or case study to share?',
      description:
        'We welcome guest authors and engineering teams building high-impact web products. Submit your pitch to our editorial desk.',
      buttonText: 'Submit Editorial Pitch',
      buttonLink: 'mailto:editor@chronicle.dev',
    },
  ];

  const blocksToRender =
    aboutData?.blocks && aboutData.blocks.length > 0
      ? aboutData.blocks
      : fallbackBlocks;

  return (
    <div className="max-w-4xl mx-auto">
      <AboutPageBuilder
        blocks={blocksToRender}
        authors={authors}
      />
    </div>
  );
}
