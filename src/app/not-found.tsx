import Link from 'next/link';
import { Compass, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function NotFound() {
  return (
    <div className="min-h-[55vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="w-20 h-20 rounded-3xl bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
        <Compass className="w-10 h-10 animate-spin-slow" />
      </div>
      <div className="space-y-2 max-w-md">
        <span className="text-xs font-bold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
          404 Error
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
          Page not found
        </h1>
        <p className="text-sm text-zinc-500 dark:text-zinc-400">
          The article or page you are looking for does not exist or has been moved.
        </p>
      </div>
      <Link href="/">
        <Button variant="primary" className="rounded-xl">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Homepage
        </Button>
      </Link>
    </div>
  );
}
