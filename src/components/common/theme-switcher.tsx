'use client';

import { useTheme } from 'next-themes';
import { Select, SelectContent, SelectItem, SelectTrigger } from '@/ui/select';
import { MoonStar, SunMedium } from 'lucide-react';

const themes = ['light', 'dark', 'system'] as const;

export const ThemeSwitcher = () => {
  const { setTheme } = useTheme();

  return (
    <Select onValueChange={setTheme}>
      <SelectTrigger
        aria-label='Select theme'
        hideArrow
        className='flex w-12 justify-center bg-transparent'>
        <div>
          <MoonStar width={18} height={18} className='hidden dark:block' />
          <SunMedium width={18} height={18} className='dark:hidden' />
        </div>
      </SelectTrigger>
      <SelectContent>
        {themes.map((theme) => (
          <SelectItem key={theme} value={theme} className='capitalize'>
            {theme}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
