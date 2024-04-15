'use client';
import { NextLink } from '@/components/common';
import { Button } from '@/ui/button';
import { useDir } from '@/hooks/use-dir';
import { Avatar, AvatarFallback } from '@/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { useTranslations } from 'use-intl';

type NavItem = {
  title: TranslationKey;
  shortcut: string;
  href: string;
};

const nav_items: NavItem[] = [
  {
    title: 'myaccount',
    shortcut: '⇧⌘P',
    href: '/account',
  },
  {
    title: 'settings',
    shortcut: '⇧⌘S',
    href: '/settings',
  },

  {
    title: 'billing',
    shortcut: '⇧⌘B',
    href: '/billing',
  },
];

export const UserNav = () => {
  const t = useTranslations('Dashboard');
  const dir = useDir();

  return (
    <DropdownMenu dir={dir}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback>MO</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-52" sideOffset={8}>
        <DropdownMenuLabel>
          <div className="flex flex-col">
            <div className="mb-1 text-sm leading-none">mohammadou</div>
            <div className="text-xs text-muted-foreground">
              it.moh.ou@gmail.com
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {nav_items.map((item) => (
            <DropdownMenuItem key={item.title + item.href} asChild>
              <NextLink
                href={`dashboard${item.href}`}
                className="flex justify-between"
              >
                <span className="grow">{t(item.title)}</span>
                <DropdownMenuShortcut>{item.shortcut}</DropdownMenuShortcut>
              </NextLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
