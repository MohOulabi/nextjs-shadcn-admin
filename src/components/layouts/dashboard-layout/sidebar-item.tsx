'use client';
import { NextLink } from '@/components/common';
import { SidebarLink, SidebarLinkItem } from '@/constants/sidebar-links';
import { useDir } from '@/hooks/use-dir';
import { usePathname } from '@/i18n';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/ui/accordion';
import { Button, buttonVariants } from '@/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/ui/dropdown-menu';
import { Tooltip, TooltipContent } from '@/ui/tooltip';
import { cn } from '@/utils/cn';
import { useSidebar } from '@/zustand/sidebar-store';
import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { useTranslations } from 'next-intl';

type SidebarItemProps = {
  link: SidebarLink;
  ignoreCollapse?: boolean;
};
export const SidebarItem = ({ link, ignoreCollapse }: SidebarItemProps) => {
  const isOpen = useSidebar((state) => state.isOpen) || ignoreCollapse;
  const t = useTranslations('Dashboard');

  if (link.type === 'divider') {
    if (!isOpen) return null;
    return (
      <li className='my-3'>
        <span className='block text-xs font-semibold uppercase text-accent-foreground/70'>
          {t(link.title)}
        </span>
      </li>
    );
  }

  if (link.children)
    return (
      <motion.li transition={{ duration: 0.3 }} layout='position' className='relative mb-2'>
        <SidebarItemAccordion link={link} ignoreCollapse={ignoreCollapse} />
      </motion.li>
    );

  return (
    <motion.li transition={{ duration: 0.3 }} layout='position' className='mb-2'>
      <SidebarNavLink link={link} ignoreCollapse={ignoreCollapse} />
    </motion.li>
  );
};

type NavLinkProps = { link: SidebarLinkItem; ignoreCollapse?: boolean };

const SidebarNavLink = ({ link, ignoreCollapse }: NavLinkProps) => {
  const pathname = usePathname();
  const isActive = `/dashboard${link.href}` === pathname;
  const isOpen = useSidebar((state) => state.isOpen) || ignoreCollapse;
  const t = useTranslations('Dashboard');

  if (!isOpen)
    return (
      <Tooltip delayDuration={0}>
        <TooltipTrigger asChild className='duration-0'>
          <NextLink
            href={`/dashboard${link.href}`}
            className={cn(
              buttonVariants({ variant: 'ghost' }),
              'relative flex h-12 justify-start hover:bg-accent focus:bg-accent',
              isActive && 'bg-muted'
            )}>
            <link.icon size={20} className='shrink-0 text-accent-foreground' />
          </NextLink>
        </TooltipTrigger>
        <TooltipContent side='right' sideOffset={12} className='flex items-center gap-2'>
          {t(link.title)}
        </TooltipContent>
      </Tooltip>
    );

  return (
    <NextLink
      className={cn(
        buttonVariants({ variant: 'ghost' }),
        'relative flex h-12 justify-start hover:bg-accent focus:bg-accent',
        isActive && 'group bg-accent text-primary'
      )}
      href={`/dashboard${link.href}`}>
      <link.icon size={20} className='shrink-0 text-accent-foreground group-[]:text-primary' />
      <span className='absolute capitalize ltr:left-11 rtl:right-11'>{t(link.title)}</span>
    </NextLink>
  );
};

const SidebarItemAccordion = ({ link, ignoreCollapse }: NavLinkProps) => {
  const isOpen = useSidebar((state) => state.isOpen) || ignoreCollapse;
  const dir = useDir();
  const isRTL = dir === 'rtl';
  const t = useTranslations('Dashboard');

  if (!isOpen) {
    return (
      <DropdownMenu dir={dir}>
        <Tooltip delayDuration={0}>
          <TooltipTrigger asChild className='duration-0'>
            <DropdownMenuTrigger asChild>
              <Button
                variant='ghost'
                className='relative flex h-12 justify-between duration-0 hover:bg-accent focus:bg-accent'>
                <link.icon size={20} className='shrink-0 text-accent-foreground' />
                <span className='sr-only'>{t(link.title)}</span>
              </Button>
            </DropdownMenuTrigger>
          </TooltipTrigger>
          <TooltipContent
            side={isRTL ? 'left' : 'right'}
            sideOffset={12}
            className='flex items-center gap-2'>
            {t(link.title)}
            <ChevronRight size={16} className='rtl:rotate-180' />
          </TooltipContent>
        </Tooltip>
        <DropdownMenuContent sideOffset={8} side={isRTL ? 'left' : 'right'} align='start'>
          <DropdownMenuLabel>{t(link.title)}</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {link.children!.map((child) => (
            <DropdownMenuItem key={child.title + child.href} asChild>
              <NextLink href={`/dashboard${link.href}${child.href}`}>
                <span> {t(child.title)}</span>
              </NextLink>
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <Accordion key={link.href} type='single' collapsible>
      <AccordionItem value={link.title} className='border-b-0'>
        <AccordionTrigger
          className={cn(
            buttonVariants({ variant: 'ghost' }),
            'relative flex h-12 justify-between duration-0 hover:bg-accent focus:bg-accent'
          )}>
          <div>
            <link.icon size={20} className='shrink-0 text-accent-foreground' />
          </div>
          <span className='absolute capitalize ltr:left-11 rtl:right-11'> {t(link.title)}</span>
        </AccordionTrigger>
        <AccordionContent className='mt-3 space-y-2 pb-1 ltr:pl-4 ltr:pr-1 rtl:pl-1 rtl:pr-4'>
          {link.children!.map((child) => (
            <NextLink
              href={`/dashboard${link.href}${child.href}`}
              key={child.title}
              className={cn(
                buttonVariants({ variant: 'ghost' }),
                'relative flex h-10 w-full justify-start gap-3 hover:bg-accent focus:bg-accent'
              )}>
              <div className='size-2 rounded-full border bg-accent-foreground' />
              <span> {t(child.title)}</span>
            </NextLink>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};
