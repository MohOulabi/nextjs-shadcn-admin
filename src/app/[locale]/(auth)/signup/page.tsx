import { SignupForm } from '@/components/screens/auth/signup-form';
import { Metadata } from 'next';
import { getMessages, getTranslations } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { pick } from 'lodash';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');
  return {
    title: t('signup_page_title'),
    description: t('signup_page_description'),
  };
}

const SignupPage: NextPage = async ({ params: { locale } }) => {
  const t = await getTranslations('Signup');
  const messages = await getMessages();

  return (
    <>
      <div className='mb-4 grid gap-2 text-center'>
        <h1 className='text-3xl font-bold'>{t('title')}</h1>
        <p className='text-muted-foreground'>{t('description')}</p>
      </div>
      <NextIntlClientProvider
        locale={locale}
        messages={pick(messages, ['Signup', 'Common', 'Validation'])}>
        <SignupForm />
      </NextIntlClientProvider>
    </>
  );
};

export default SignupPage;
