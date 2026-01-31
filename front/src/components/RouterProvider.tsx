import { createContext, useState, ReactNode } from 'react';

export type Page =
  | 'home'
  | 'opportunities'
  | 'visa-sponsors'
  | 'news'
  | 'community'
  | 'admin'
  | 'signin'   // ✅ ADD
  | 'signup';  // ✅ ADD

export interface RouterContextType {
  currentPage: Page;
  navigateTo: (page: Page) => void;
}

export const RouterContext = createContext<RouterContextType | null>(null);

export function RouterProvider({ children }: { children: ReactNode }) {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const navigateTo = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  return (
    <RouterContext.Provider value={{ currentPage, navigateTo }}>
      {children}
    </RouterContext.Provider>
  );
}
