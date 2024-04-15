'use client';

import { LOCALES } from '@/config';
import { usePathname, useRouter } from '@/i18n';
import { useParams } from 'next/navigation';
import { Select, SelectTrigger, SelectContent, SelectItem } from '@/ui/select';
import ReactCountryFlag from 'react-country-flag';

type LOCALE = (typeof LOCALES)[number];

const flags: Record<
  LOCALE,
  {
    flag: string;
    title: string;
    className?: string;
  }
> = {
  ar: {
    flag: 'sa',
    title: 'عربي',
    className: 'font-cairo',
  },
  en: {
    flag: 'us',
    title: 'EN',
    className: 'font-inter',
  },
};

export const LocaleSwitcher = () => {
  let pathname = usePathname();
  const { locale }: { locale: LOCALE } = useParams();
  const router = useRouter();

  if (pathname.endsWith('/')) pathname = pathname.slice(0, -1);

  const updateLocale = (locale: LOCALE) => {
    router.push(pathname, { locale });
  };

  return (
    <Select defaultValue={locale} onValueChange={updateLocale}>
      <SelectTrigger aria-label='Select language' className='w-auto min-w-[90px] bg-transparent'>
        <div className='flex items-center gap-2 uppercase'>
          <ReactCountryFlag
            svg
            className='text-xl'
            countryCode={flags[locale].flag}
            title={flags[locale].flag}
          />
          <span>{flags[locale].title}</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {LOCALES.map((l) => (
          <SelectItem key={l} value={l}>
            <div className='flex items-center gap-2 uppercase'>
              <ReactCountryFlag
                svg
                className='text-xl'
                countryCode={flags[l].flag}
                title={flags[l].flag}
              />
              <span className={flags[l].className}>{flags[l].title}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};
