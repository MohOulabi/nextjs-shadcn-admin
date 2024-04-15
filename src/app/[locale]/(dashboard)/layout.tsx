import { DashboardLayout } from '@/components/layouts/dashboard-layout';
import { pick } from 'lodash';
import { getMessages } from 'next-intl/server';

export default async function Layout({ children }: LayoutProps) {
  const messages = await getMessages();

  return (
    <DashboardLayout messages={pick(messages, ['Dashboard', 'Error'])}>{children}</DashboardLayout>
  );
}
