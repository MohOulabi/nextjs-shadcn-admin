'use client';

import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogFooter, DialogTitle } from '@/components/ui/dialog';
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';
import useMediaQuery from '@/hooks/use-media-query';
import { useRouter } from '@/i18n';
import { TriangleAlert } from 'lucide-react';

type LogoutModalProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const LogoutModal = ({ isOpen, onClose }: LogoutModalProps) => {
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  const router = useRouter();

  const onLogout = () => {
    router.replace('/login');
  };

  if (isDesktop)
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent>
          <DialogTitle>You're About to Logout</DialogTitle>
          <div className='flex items-center gap-2 py-2'>
            <TriangleAlert className='fill-yellow-600' size={32} />
            <span className='text-destructive'>
              Are you sure you would like to logout of your account?
            </span>
          </div>
          <DialogFooter>
            <Button variant='secondary' onClick={onClose}>
              Cancel
            </Button>
            <Button onClick={onLogout}>Logout</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

  const closeDrawer = (v: boolean) => {
    if (!v) onClose();
  };

  return (
    <Drawer onOpenChange={closeDrawer} open={isOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>You're About to Logout</DrawerTitle>
        </DrawerHeader>
        <div className='flex items-center justify-center gap-2 p-4 sm:justify-start'>
          <TriangleAlert className='fill-yellow-600' size={36} />
          <span className='text-destructive'>
            Are you sure you would like to logout of your account?
          </span>
        </div>
        <DrawerFooter>
          <Button variant='secondary' onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={onLogout}>Logout</Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};
