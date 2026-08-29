import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NavigationDrawer } from '@/components/organisms/navigation-drawer';
import { NAVIGATION_ITEMS } from '@/constants/navigation.constants';

describe('NavigationDrawer Organism (RF-003, RF-004, RF-005, RF-007, US-01, US-02, US-04)', () => {
  const handleClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  const renderDrawer = (isOpen = true) => {
    return render(
      <BrowserRouter>
        <NavigationDrawer isOpen={isOpen} onClose={handleClose} />
      </BrowserRouter>
    );
  };

  it('não deve renderizar no DOM quando isOpen for false', () => {
    renderDrawer(false);

    expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
  });

  it('deve renderizar todas as rotas de navegação do acervo quando isOpen for true', () => {
    renderDrawer(true);

    expect(screen.getByRole('dialog', { name: /menu de navegação/i })).toBeInTheDocument();

    NAVIGATION_ITEMS.forEach((item) => {
      expect(screen.getByText(item.label)).toBeInTheDocument();
      expect(screen.getByText(item.index)).toBeInTheDocument();
    });
  });

  it('deve chamar onClose ao clicar no botão de fechar (X)', () => {
    renderDrawer(true);

    const closeButton = screen.getByRole('button', { name: /fechar menu/i });
    fireEvent.click(closeButton);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onClose ao pressionar a tecla ESC', () => {
    renderDrawer(true);

    fireEvent.keyDown(window, { key: 'Escape' });

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onClose ao clicar no backdrop escuro', () => {
    renderDrawer(true);

    const backdrop = screen.getByTestId('drawer-backdrop');
    fireEvent.click(backdrop);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  it('deve chamar onClose ao selecionar qualquer item do menu', () => {
    renderDrawer(true);

    const homeLink = screen.getByText('Home');
    fireEvent.click(homeLink);

    expect(handleClose).toHaveBeenCalledTimes(1);
  });
});
