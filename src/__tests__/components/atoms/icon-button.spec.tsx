import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { Menu } from 'lucide-react';
import { IconButton } from '@/components/atoms/icon-button';

describe('IconButton Atom (RF-001, RF-007)', () => {
  it('deve renderizar com aria-label obrigatório para leitores de tela', () => {
    render(
      <IconButton aria-label="Abrir menu">
        <Menu />
      </IconButton>
    );

    const button = screen.getByRole('button', { name: /abrir menu/i });
    expect(button).toBeInTheDocument();
  });

  it('deve disparar o evento onClick quando acionado', () => {
    const handleClick = vi.fn();
    render(
      <IconButton aria-label="Abrir menu" onClick={handleClick}>
        <Menu />
      </IconButton>
    );

    const button = screen.getByRole('button', { name: /abrir menu/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
