import { AuthLayout } from '@/components/layouts/auth-layout';
import { Metadata } from 'next';
// import { redirect } from '@/i18n';
// import { cookies } from 'next/headers';

export const metadata: Metadata = {
  robots: {
    follow: process.env.NEXT_PUBLIC_ENV === 'production',
    index: process.env.NEXT_PUBLIC_ENV === 'production',
  },
};

export default function Layout({ children }: LayoutProps) {
  // const token = cookies().get('token')?.value;
  // if (token) redirect('/dashboard');

  return <AuthLayout>{children}</AuthLayout>;
}
