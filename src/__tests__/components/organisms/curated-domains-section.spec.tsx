import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { CuratedDomainsSection } from '@/components/organisms/curated-domains-section';
import { CATEGORY_OPTIONS } from '@/enums/category.enum';
import { HOME_CONTENT } from '@/constants/home.constants';

describe('CuratedDomainsSection Component (RF-004, RF-009, US-02)', () => {
  it('deve renderizar o cabeçalho da seção de domínios curados', () => {
    render(<CuratedDomainsSection />);

    expect(screen.getByText(HOME_CONTENT.domains.tagline)).toBeInTheDocument();
    expect(screen.getByText(HOME_CONTENT.domains.title)).toBeInTheDocument();
  });

  it('deve renderizar todas as categorias mapeadas em CATEGORY_OPTIONS', () => {
    render(<CuratedDomainsSection />);

    CATEGORY_OPTIONS.forEach((category) => {
      expect(screen.getByText(category.label)).toBeInTheDocument();
      expect(screen.getByText(category.description)).toBeInTheDocument();
    });
  });
});
