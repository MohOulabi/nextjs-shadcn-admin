import { LocaleSwitcher, ThemeSwitcher } from '@/components/common';
import Image from 'next/image';
import AuthBG from '#/public/images/auth-bg.webp';

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <main className='flex flex-grow'>
      <div className='flex w-full flex-col-reverse justify-end lg:grid lg:grid-cols-2'>
        <div className='jusify-center container flex flex-grow py-6'>
          <div className='mx-auto flex w-[380px] flex-col'>
            <div className='flex flex-grow flex-col justify-center'>{children}</div>
            <div className='mt-10 flex justify-start gap-4 self-end'>
              <LocaleSwitcher />
              <ThemeSwitcher />
            </div>
          </div>
        </div>
        <div className='relative top-0 max-h-screen min-h-[150px] bg-muted lg:sticky'>
          <Image
            priority
            src={AuthBG}
            alt=''
            placeholder='blur'
            fill
            className='object-cover'
            sizes='(max-width:768px) 70vw, (max-width: 1200px) 80vw, 100vw'
          />
        </div>
      </div>
    </main>
  );
};
