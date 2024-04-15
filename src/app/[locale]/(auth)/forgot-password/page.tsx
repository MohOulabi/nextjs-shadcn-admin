import { Metadata } from 'next';
import { getMessages, getTranslations } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { pick } from 'lodash';
import { ForgotPasswordForm } from '@/components/screens/auth/forgot-password-form';
import { NextLink } from '@/components/common';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/ui/button';

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata');
  return {
    title: t('forgot_password_page_title'),
    description: t('forgot_password_page_description'),
    robots: {
      follow: process.env.NEXT_PUBLIC_ENV === 'production',
      index: process.env.NEXT_PUBLIC_ENV === 'production',
    },
  };
}

const LoginPage: NextPage = async ({ params: { locale } }) => {
  const t = await getTranslations('ForgotPassword');
  const messages = await getMessages();

  return (
    <>
      <Button variant='outline' className='-mt-10 mb-10 w-10' asChild>
        <NextLink replace href='/login'>
          <ArrowLeft width={18} className='shrink-0 rtl:rotate-180' />
          <span className='sr-only'>{t('back_to_login')}</span>
        </NextLink>
      </Button>
      <div className='mb-4 grid gap-2 text-center'>
        <h1 className='text-3xl font-bold'>{t('title')}</h1>
        <p className='text-muted-foreground'>{t('description')}</p>
      </div>
      <NextIntlClientProvider
        locale={locale}
        messages={pick(messages, ['ForgotPassword', 'Common', 'Validation'])}>
        <ForgotPasswordForm />
      </NextIntlClientProvider>
    </>
  );
};

export default LoginPage;
