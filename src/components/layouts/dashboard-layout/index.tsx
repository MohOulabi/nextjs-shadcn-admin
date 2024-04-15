import { Sidebar } from './sidebar';
import { SidebarProvider } from '@/zustand/sidebar-store';
import { cookies } from 'next/headers';
import { AbstractIntlMessages, NextIntlClientProvider } from 'next-intl';
import { DashboardHeader } from './dashboard-header';

type DashboardLayoutProps = {
  children: React.ReactNode;
  messages: AbstractIntlMessages;
};

// getting messages from parent in case of caching, since cookies disable cache

export const DashboardLayout = async ({ children, messages }: DashboardLayoutProps) => {
  const sidebar_collapsed = cookies().get('sidebar_collapsed')?.value === 'false' ? false : true;

  return (
    <SidebarProvider isOpen={sidebar_collapsed}>
      <NextIntlClientProvider messages={messages}>
        <div className='flex min-h-screen'>
          <Sidebar />
          <div className='flex w-full flex-col'>
            <DashboardHeader />
            <main className='container flex-grow py-4'>{children}</main>
          </div>
        </div>
      </NextIntlClientProvider>
    </SidebarProvider>
  );
};
