'use client';

import { DEFAULT_QUERY_RETRY } from '@/config';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental';
import { useState } from 'react';
import { ThemeProvider } from 'next-themes';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { dir } from '@/utils/dir';
// We can add "user" props to get it from server on first load and pass it to AuthProvider

type ProvidersProps = {
  children: React.ReactNode;
  locale: string;
  messages: AbstractIntlMessages;
};
export function Providers({ children, messages, locale }: ProvidersProps) {
  const direction = dir(locale);
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 20 * 1000,
            retry: DEFAULT_QUERY_RETRY,
          },
        },
      })
  );

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <ReactQueryStreamedHydration>
          <NextIntlClientProvider locale={locale} messages={messages}>
            {children}
          </NextIntlClientProvider>
        </ReactQueryStreamedHydration>
        {process.env.NODE_ENV === 'development' && (
          <ReactQueryDevtools
            buttonPosition={direction === 'rtl' ? 'bottom-right' : 'bottom-left'}
            initialIsOpen={false}
          />
        )}
      </ThemeProvider>
    </QueryClientProvider>
  );
}
