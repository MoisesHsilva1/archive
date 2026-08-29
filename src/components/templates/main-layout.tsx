import React from 'react';
import { Header } from '@/components/organisms/header';
import { Footer } from '@/components/organisms/footer';

export interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col bg-black text-text-primary">
      <Header />
      <main className="flex-1 w-full max-w-[1280px] mx-auto px-6 sm:px-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};
