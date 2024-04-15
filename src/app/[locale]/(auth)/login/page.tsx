import { LoginForm } from '@/components/screens/auth/login-form';
import { Metadata } from 'next';
import { getMessages, getTranslations } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { pick } from 'lodash';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');
  return {
    title: t('login_page_title'),
    description: t('login_page_description'),
    robots: {
      follow: process.env.NEXT_PUBLIC_ENV === 'production',
      index: process.env.NEXT_PUBLIC_ENV === 'production',
    },
  };
}

const LoginPage: NextPage = async ({ params: { locale } }) => {
  const t = await getTranslations('Login');
  const messages = await getMessages();

  return (
    <>
      <div className='mb-4 grid gap-2 text-center'>
        <h1 className='text-3xl font-bold'>{t('title')}</h1>
        <p className='text-muted-foreground'>{t('description')}</p>
      </div>
      <NextIntlClientProvider
        locale={locale}
        messages={pick(messages, ['Login', 'Common', 'Validation'])}>
        <LoginForm />
      </NextIntlClientProvider>
    </>
  );
};

export default LoginPage;
