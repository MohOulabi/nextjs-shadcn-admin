import { AuthLayout } from '@/components/layouts/auth-layout';
// import { redirect } from '@/i18n';
// import { cookies } from 'next/headers';

export default function Layout({ children }: LayoutProps) {
  // const token = cookies().get('token')?.value;
  // if (token) redirect('/dashboard');

  return <AuthLayout>{children}</AuthLayout>;
}
