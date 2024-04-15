'use client';
import { createContext, useContext, useRef } from 'react';
import { createStore, useStore } from 'zustand';
import jsCookie from 'js-cookie';

interface SidebarProps {
  isOpen?: boolean;
}

interface SidebarState extends SidebarProps {
  toggle: () => void;
}

type SidebarStore = ReturnType<typeof createSidebrStore>;

const createSidebrStore = (initialProps?: Partial<SidebarProps>) => {
  const DEFAULT_PROPS: SidebarProps = {
    isOpen: true,
  };

  return createStore<SidebarState>()((set) => ({
    ...DEFAULT_PROPS,
    ...initialProps,
    toggle: () =>
      set((state) => {
        jsCookie.set('sidebar_collapsed', String(!state.isOpen), {
          path: '/',
          expires: 30,
        });
        return { isOpen: !state.isOpen };
      }),
  }));
};

export const SidebarContext = createContext<SidebarStore | null>(null);

type SidebarProviderProps = React.PropsWithChildren<SidebarProps>;

export function SidebarProvider({ children, ...props }: SidebarProviderProps) {
  const storeRef = useRef<SidebarStore>();
  if (!storeRef.current) {
    storeRef.current = createSidebrStore(props);
  }

  return <SidebarContext.Provider value={storeRef.current}>{children}</SidebarContext.Provider>;
}

export function useSidebar<T>(selector: (state: SidebarState) => T): T {
  const store = useContext(SidebarContext);
  if (!store) throw new Error('Missing Sidebar.Provider in the tree');
  const useSidebarStore = useStore(store, selector);

  return useSidebarStore;
}
