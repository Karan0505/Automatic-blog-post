'use client';

import * as React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="w-16 h-16 rounded-2xl bg-rose-500/10 text-rose-500 flex items-center justify-center">
        <AlertTriangle className="w-8 h-8" />
      </div>
      <div className="space-y-2 max-w-md">
        <h2 className="text-2xl font-bold text-zinc-900 dark:text-white">
          Something went wrong
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          An unexpected error occurred while fetching content. Please try again or return to the homepage.
        </p>
      </div>
      <div className="flex gap-3">
        <Button onClick={() => reset()} variant="primary">
          <RefreshCw className="w-4 h-4 mr-2" />
          Try Again
        </Button>
      </div>
    </div>
  );
}
