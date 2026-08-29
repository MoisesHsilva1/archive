import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { HomePage } from '@/pages/home-page';
import { CreatePage } from '@/pages/create-page';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/create" element={<CreatePage />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  );
};
