import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { HeroSection } from '@/components/organisms/hero-section';
import { HOME_CONTENT } from '@/constants/home.constants';

describe('HeroSection Component (RF-001, RF-002, US-01)', () => {
  it('deve renderizar o título principal identificando o Archive', () => {
    render(<HeroSection />);

    const mainHeadline = screen.getByRole('heading', { level: 1 });
    expect(mainHeadline).toHaveTextContent(HOME_CONTENT.hero.title);
  });

  it('deve exibir o autor do arquivo pessoal acima do título principal', () => {
    render(<HeroSection />);

    expect(screen.getByText(HOME_CONTENT.hero.author)).toBeInTheDocument();
  });

  it('deve exibir o subtítulo introdutório do propósito do Archive', () => {
    render(<HeroSection />);

    expect(screen.getByText(HOME_CONTENT.hero.subtitle)).toBeInTheDocument();
  });

  it('deve renderizar a ilustração cósmica em nanquim com texto alternativo', () => {
    render(<HeroSection />);

    const image = screen.getByRole('img');
    expect(image).toHaveAttribute('alt', HOME_CONTENT.hero.artAlt);
  });
});
