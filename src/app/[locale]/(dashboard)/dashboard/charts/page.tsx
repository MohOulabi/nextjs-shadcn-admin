import { ChartsPageContent } from '@/components/screens/charts';
import { pick } from 'lodash';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';

const ChartsPage: NextPage = async ({ params: { locale } }) => {
  const messages = await getMessages();

  return (
    <NextIntlClientProvider
      locale={locale}
      // no translations were added to make the code easier to customize
      messages={pick(messages, ['Charts'])}>
      <ChartsPageContent />
    </NextIntlClientProvider>
  );
};

export default ChartsPage;
