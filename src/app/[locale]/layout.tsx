import '@/styles/globals.css';
import type { Metadata, Viewport } from 'next';
import { getTranslations } from 'next-intl/server';
import { Providers } from '../providers';
import { dir } from '@/utils/dir';
import { Cairo, Inter } from 'next/font/google';
import { cn } from '@/utils/cn';
import { Toaster } from '@/ui/sonner';
import { useMessages } from 'next-intl';
import pick from 'lodash/pick';

const cairo = Cairo({
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-cairo',
});

const inter = Inter({
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  subsets: ['latin'],
  variable: '--font-inter',
});

export const viewport: Viewport = {
  maximumScale: 1,
  initialScale: 1,
  width: 'device-width',
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: 'white' },
    { media: '(prefers-color-scheme: dark)', color: 'black' },
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');
  return {
    title: {
      default: t('default_title'),
      template: `%s | ${t('default_title')}`,
    },
    description: t('default_description'),

    robots: {
      follow: process.env.NEXT_PUBLIC_ENV === 'production',
      index: process.env.NEXT_PUBLIC_ENV === 'production',
    },
  };
}

export default function RootLocaleLayout({ children, params: { locale } }: LayoutProps) {
  const messages = useMessages();
  return (
    <html lang={locale} dir={dir(locale)} suppressHydrationWarning>
      <body
        className={cn(
          'flex min-h-screen flex-col bg-background text-foreground antialiased',
          cairo.variable,
          inter.variable,
          locale === 'ar' ? 'font-cairo' : 'font-inter'
        )}>
        <Providers locale={locale} messages={pick(messages, ['Error', 'Common'])}>
          {children}
          <Toaster position={dir(locale) === 'rtl' ? 'top-left' : 'top-right'} richColors />
        </Providers>
      </body>
    </html>
  );
}
