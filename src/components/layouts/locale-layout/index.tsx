import pick from 'lodash/pick';
import { NextIntlClientProvider, useMessages } from 'next-intl';

export default function LocaleLayout({ children, params: { locale } }: LayoutProps) {
  // ...
  const messages = useMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider locale={locale} messages={pick(messages, 'Error')}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
