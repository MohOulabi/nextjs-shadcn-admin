import { LocaleSwitcher, ThemeSwitcher } from '@/components/common';
import { UserNav } from './user-nav';
import { MobileSidebar } from './mobile-sidebar';

export const DashboardHeader = () => {
  return (
    <header className='flex h-16 items-center justify-between border-b bg-background px-4'>
      <div>
        <div className='md:hidden'>
          <MobileSidebar />
        </div>
      </div>
      <div className='flex items-center gap-4'>
        <LocaleSwitcher />
        <ThemeSwitcher />
        <UserNav />
      </div>
    </header>
  );
};
