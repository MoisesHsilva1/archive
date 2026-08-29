import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { HomePage } from '@/pages/home-page';
import { HOME_CONTENT } from '@/constants/home.constants';

describe('HomePage Integration (RF-001 a RF-009, CS-001 a CS-004)', () => {
  const renderHomePage = () => {
    return render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
  };

  it('deve renderizar a estrutura semântica completa com Header, Main e Footer', () => {
    renderHomePage();

    expect(screen.getByRole('banner')).toBeInTheDocument();
    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByRole('contentinfo')).toBeInTheDocument();
  });

  it('deve possuir apenas um heading h1 principal (Hero)', () => {
    renderHomePage();

    const h1Headings = screen.getAllByRole('heading', { level: 1 });
    expect(h1Headings).toHaveLength(1);
    expect(h1Headings[0]).toHaveTextContent(HOME_CONTENT.hero.title);
  });

  it('deve conter as seções de Apresentação, Sobre e Curadoria (CS-001, CS-002, CS-003)', () => {
    renderHomePage();

    expect(screen.getByRole('region', { name: /apresentação do archive/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /sobre o archive e o autor/i })).toBeInTheDocument();
    expect(screen.getByRole('region', { name: /áreas de curadoria do archive/i })).toBeInTheDocument();
  });
});
