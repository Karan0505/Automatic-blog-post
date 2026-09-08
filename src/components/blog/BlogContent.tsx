import * as React from 'react';
import { TableOfContentsItem } from '@/types/blog';

interface BlogContentProps {
  content: string;
  tableOfContents?: TableOfContentsItem[];
}

function cleanHeadingText(raw: string): string {
  return raw
    .replace(/\*\*(.*?)\*\*/g, '$1')
    .replace(/\*(.*?)\*/g, '$1')
    .replace(/`(.*?)`/g, '$1')
    .trim();
}

function slugify(text: string): string {
  return cleanHeadingText(text)
    .toLowerCase()
    .replace(/[—–]/g, '-')
    .replace(/[^\w\s-]/g, '')
    .trim()
    .replace(/[\s_-]+/g, '-');
}

function renderInline(text: string): React.ReactNode {
  const parts: React.ReactNode[] = [];
  const regex = /(\*\*.*?\*\*|`.*?`|\*.*?\*)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = regex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    const token = match[0];
    if (token.startsWith('**') && token.endsWith('**')) {
      parts.push(
        <strong key={match.index} className="font-semibold text-zinc-900 dark:text-white">
          {token.slice(2, -2)}
        </strong>
      );
    } else if (token.startsWith('`') && token.endsWith('`')) {
      parts.push(
        <code
          key={match.index}
          className="px-1.5 py-0.5 rounded bg-zinc-100 dark:bg-zinc-800 text-indigo-600 dark:text-indigo-400 font-mono text-xs sm:text-sm"
        >
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith('*') && token.endsWith('*')) {
      parts.push(<em key={match.index}>{token.slice(1, -1)}</em>);
    }
    lastIndex = regex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }

  return parts.length > 0 ? parts : text;
}

export function BlogContent({ content, tableOfContents }: BlogContentProps) {
  const usedIds = new Set<string>();

  const getHeadingId = (rawText: string) => {
    const clean = cleanHeadingText(rawText);
    const targetSlug = slugify(clean);

    // Look for exact match or normalized match in tableOfContents
    const matched = tableOfContents?.find((item) => {
      const itemClean = cleanHeadingText(item.title).toLowerCase();
      const currentClean = clean.toLowerCase();
      return (
        itemClean === currentClean ||
        item.anchor === targetSlug ||
        itemClean.replace(/[^\w]/g, '') === currentClean.replace(/[^\w]/g, '')
      );
    });

    const baseId = matched?.anchor || targetSlug;
    let id = baseId;
    let counter = 1;
    while (usedIds.has(id)) {
      id = `${baseId}-${counter}`;
      counter++;
    }
    usedIds.add(id);
    return id;
  };

  const renderFormattedContent = () => {
    if (!content) return null;

    const sections = content.split(/\n\n+/);

    return sections.map((section, idx) => {
      const trimmed = section.trim();

      // Heading 1
      if (trimmed.startsWith('# ')) {
        const text = trimmed.replace('# ', '');
        const headingId = getHeadingId(text);
        return (
          <h1
            key={idx}
            id={headingId}
            className="text-3xl font-extrabold text-zinc-900 dark:text-white mt-10 mb-4 tracking-tight scroll-mt-28 transition-colors duration-300"
          >
            {renderInline(text)}
          </h1>
        );
      }

      // Heading 2
      if (trimmed.startsWith('## ')) {
        const text = trimmed.replace('## ', '');
        const headingId = getHeadingId(text);
        return (
          <h2
            key={idx}
            id={headingId}
            className="text-2xl font-bold text-zinc-900 dark:text-white mt-8 mb-4 tracking-tight border-b border-zinc-200 dark:border-zinc-800 pb-2 scroll-mt-28 transition-colors duration-300"
          >
            {renderInline(text)}
          </h2>
        );
      }

      // Heading 3
      if (trimmed.startsWith('### ')) {
        const text = trimmed.replace('### ', '');
        const headingId = getHeadingId(text);
        return (
          <h3
            key={idx}
            id={headingId}
            className="text-xl font-bold text-zinc-900 dark:text-white mt-6 mb-3 tracking-tight scroll-mt-28 transition-colors duration-300"
          >
            {renderInline(text)}
          </h3>
        );
      }

      // Blockquote
      if (trimmed.startsWith('> ')) {
        const text = trimmed.replace(/^>\s*/, '');
        return (
          <blockquote
            key={idx}
            className="my-6 pl-4 border-l-4 border-indigo-500 bg-indigo-50/50 dark:bg-indigo-950/30 py-3 pr-4 rounded-r-xl text-zinc-700 dark:text-zinc-300 italic text-base leading-relaxed"
          >
            {renderInline(text)}
          </blockquote>
        );
      }

      // Code block
      if (trimmed.startsWith('```')) {
        const lines = trimmed.split('\n');
        const code = lines.slice(1, -1).join('\n');
        return (
          <pre
            key={idx}
            className="my-6 p-5 rounded-2xl bg-zinc-900 text-zinc-100 font-mono text-xs sm:text-sm overflow-x-auto border border-zinc-800 shadow-xl"
          >
            <code>{code}</code>
          </pre>
        );
      }

      // Bullet List
      if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
        const items = trimmed.split('\n').map((line) => line.replace(/^[-*]\s*/, ''));
        return (
          <ul key={idx} className="my-4 space-y-2 list-disc list-inside text-zinc-700 dark:text-zinc-300 text-base leading-relaxed pl-2">
            {items.map((item, i) => (
              <li key={i}>{renderInline(item)}</li>
            ))}
          </ul>
        );
      }

      // Numbered List
      if (/^\d+\.\s/.test(trimmed)) {
        const items = trimmed.split('\n').map((line) => line.replace(/^\d+\.\s*/, ''));
        return (
          <ol key={idx} className="my-4 space-y-2 list-decimal list-inside text-zinc-700 dark:text-zinc-300 text-base leading-relaxed pl-2">
            {items.map((item, i) => (
              <li key={i}>{renderInline(item)}</li>
            ))}
          </ol>
        );
      }

      // Standard Paragraph
      return (
        <p key={idx} className="text-zinc-700 dark:text-zinc-300 text-base sm:text-lg leading-relaxed mb-6 font-normal">
          {renderInline(trimmed)}
        </p>
      );
    });
  };

  return (
    <div className="prose dark:prose-invert max-w-none">
      {renderFormattedContent()}
    </div>
  );
}
