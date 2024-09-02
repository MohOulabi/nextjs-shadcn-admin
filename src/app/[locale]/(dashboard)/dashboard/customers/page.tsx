import { generateCustomers } from '@/components/screens/customers/customers-list/mock-customers';
import { CustomersTable } from '@/components/screens/customers/customers-list/customers-table';
import { NextIntlClientProvider, useMessages, useTranslations } from 'next-intl';
import pick from 'lodash/pick';

const CustomersPage: NextPage = ({ params: { locale } }) => {
  const t = useTranslations('Dashboard');
  const messages = useMessages();
  const customers = generateCustomers(100);

  return (
    <div className='container mx-auto py-10'>
      <h1 className='mb-5 text-2xl font-bold'>{t('customers')}</h1>
      <NextIntlClientProvider locale={locale} messages={pick(messages, ['Common'])}>
        <CustomersTable customers={customers} />
      </NextIntlClientProvider>
    </div>
  );
};

export default CustomersPage;
