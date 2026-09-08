'use client';

import * as React from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { cn } from '@/lib/utils/cn';

export interface CustomImageProps extends Omit<NextImageProps, 'src'> {
  src?: string | null;
  fallbackSrc?: string;
}

export function Image({
  src,
  alt = '',
  className,
  fallbackSrc = '',
  unoptimized = true,
  ...props
}: CustomImageProps) {
  const resolvedSrc = src || fallbackSrc;
  const [imgSrc, setImgSrc] = React.useState<string>(resolvedSrc);
  const [prevResolvedSrc, setPrevResolvedSrc] = React.useState<string>(resolvedSrc);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [hasError, setHasError] = React.useState<boolean>(!resolvedSrc);

  if (resolvedSrc !== prevResolvedSrc) {
    setPrevResolvedSrc(resolvedSrc);
    setImgSrc(resolvedSrc);
    setHasError(!resolvedSrc);
  }

  if (!imgSrc || hasError) {
    return (
      <div className={cn('relative overflow-hidden bg-zinc-200/60 dark:bg-zinc-800/60 flex items-center justify-center text-zinc-400 text-xs', className)}>
        <span>{alt || 'No Image'}</span>
      </div>
    );
  }

  return (
    <div className={cn('relative overflow-hidden bg-zinc-100 dark:bg-zinc-800/60', className)}>
      <NextImage
        src={imgSrc}
        alt={alt}
        unoptimized={unoptimized}
        className={cn(
          'transition-all duration-300 object-cover w-full h-full',
          isLoading ? 'scale-105 blur-sm' : 'scale-100 blur-0'
        )}
        onLoad={() => setIsLoading(false)}
        onError={() => {
          if (fallbackSrc && imgSrc !== fallbackSrc) {
            setImgSrc(fallbackSrc);
          } else {
            setHasError(true);
          }
          setIsLoading(false);
        }}
        {...props}
      />
    </div>
  );
}
