import { notFound } from 'next/navigation';
import { getHeader } from '@/lib/strapi/header';
import { getFooter } from '@/lib/strapi/footer';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { isValidLocale, SUPPORTED_LOCALES, getLocales } from '@/lib/strapi/locales';

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const resolvedParams = await params;
  const locale = resolvedParams?.locale;

  if (!locale || !isValidLocale(locale)) {
    notFound();
  }

  const [headerData, footerData, locales] = await Promise.all([
    getHeader(locale),
    getFooter(locale),
    getLocales(),
  ]);

  return (
    <>
      <Header headerData={headerData} locale={locale} initialLocales={locales} />
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        {children}
      </main>
      <Footer footerData={footerData} locale={locale} />
    </>
  );
}
