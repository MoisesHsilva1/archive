import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { NavigationDrawer } from '@/components/organisms/navigation-drawer';
import { NAVIGATION_ITEMS } from '@/constants/navigation.constants';
import * as useAuthModule from '@/hooks/useAuth';

vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(() => ({
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
    login: vi.fn(),
    logout: vi.fn(),
  })),
}));

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

  it('deve exibir o link discreto Criar Experiência quando autenticado', () => {
    vi.mocked(useAuthModule.useAuth).mockReturnValueOnce({
      user: {
        uid: 'owner-1',
        email: 'owner@archive.io',
        displayName: 'Moisés',
        photoURL: null,
      },
      isAuthenticated: true,
      isLoading: false,
      error: null,
      login: vi.fn(),
      logout: vi.fn(),
    });

    renderDrawer(true);

    expect(screen.getByText('Criar Experiência')).toBeInTheDocument();
    expect(screen.getByText('MODO PROPRIETÁRIO')).toBeInTheDocument();
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
