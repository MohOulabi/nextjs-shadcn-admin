import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';
import { LOCALES } from './config';
import { createSharedPathnamesNavigation } from 'next-intl/navigation';

export default getRequestConfig(async ({ locale }) => {
  if (!LOCALES.includes(locale as any)) notFound();
  return {
    messages: (await import(`./messages/${locale}.json`)).default,
  };
});

export const { Link, redirect, usePathname, useRouter } = createSharedPathnamesNavigation({
  locales: LOCALES,
  localePrefix: 'always',
});
