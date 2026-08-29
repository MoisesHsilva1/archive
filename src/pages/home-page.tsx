import React from 'react';
import { MainLayout } from '@/components/templates/main-layout';
import { HeroSection } from '@/components/organisms/hero-section';
import { AboutSection } from '@/components/organisms/about-section';
import { CuratedDomainsSection } from '@/components/organisms/curated-domains-section';

export const HomePage: React.FC = () => {
  return (
    <MainLayout>
      <div className="space-y-0">
        <HeroSection />
        <AboutSection />
        <CuratedDomainsSection />
      </div>
    </MainLayout>
  );
};

export default HomePage;
