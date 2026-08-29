import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { AboutSection } from '@/components/organisms/about-section';
import { HOME_CONTENT } from '@/constants/home.constants';

describe('AboutSection Component (RF-003, US-03)', () => {
  it('deve renderizar a seção de propósito com os parágrafos conceituais', () => {
    render(<AboutSection />);

    expect(screen.getByText(HOME_CONTENT.about.title)).toBeInTheDocument();
    HOME_CONTENT.about.paragraphs.forEach((paragraph) => {
      expect(screen.getByText(paragraph)).toBeInTheDocument();
    });
  });

  it('deve renderizar o manifesto sem excessos', () => {
    render(<AboutSection />);

    expect(
      screen.getByText(`"${HOME_CONTENT.about.quote}"`)
    ).toBeInTheDocument();
  });
});
