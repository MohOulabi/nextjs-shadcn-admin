import {
  ComponentIcon,
  LayoutDashboardIcon,
  PieChartIcon,
  UsersIcon,
  LockIcon,
  CircleXIcon,
  SettingsIcon,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

type NavLink = {
  title: TranslationKey;
  icon: LucideIcon;
  href: string;
  hrefAsIs?: boolean;
};

export type SidebarLinkItem = NavLink & {
  children?: Omit<NavLink, 'icon' | 'children'>[];
  type?: never;
};

export type SidebarLink =
  | SidebarLinkItem
  | {
      type: 'divider';
      title: TranslationKey;
    };

export const sidebarLinks: SidebarLink[] = [
  {
    type: 'divider',
    title: 'dashboard',
  },
  {
    title: 'dashboard',
    icon: LayoutDashboardIcon,
    href: '',
  },
  {
    type: 'divider',
    title: 'widgets',
  },
  {
    title: 'charts',
    icon: PieChartIcon,
    href: '/charts',
  },
  {
    title: 'customers',
    icon: UsersIcon,
    href: '/customers',
    children: [
      {
        title: 'list',
        href: '/list',
      },
      {
        title: 'add',
        href: '/customers/add',
      },
    ],
  },
  {
    title: 'components',
    icon: ComponentIcon,
    href: '/components',
    children: [
      {
        title: 'statistics',
        href: '/statistics',
      },
      {
        title: 'tables',
        href: '/table',
      },
      {
        title: 'cards',
        href: '/cards',
      },
      {
        title: 'forms',
        href: '/form',
      },
    ],
  },
  {
    type: 'divider',
    title: 'pages',
  },
  {
    title: 'auth',
    icon: LockIcon,
    href: '/auth',
    children: [
      {
        title: 'login',
        href: '/login',
        hrefAsIs: true,
      },
      {
        title: 'signup',
        href: '/signup',
        hrefAsIs: true,
      },
      {
        title: 'otp',
        href: '/otp',
      },
    ],
  },
  {
    title: 'error',
    icon: CircleXIcon,
    href: '/error',
    children: [
      {
        title: '404',
        href: '/404',
      },
      {
        title: '500',
        href: '/500',
      },
    ],
  },
  {
    title: 'settings',
    icon: SettingsIcon,
    href: '/settings',
  },
];
