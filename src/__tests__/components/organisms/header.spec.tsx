import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { describe, it, expect } from 'vitest';
import { Header } from '@/components/organisms/header';

describe('Header Integration (RF-001, RF-002, RF-003, CS-001, CS-003)', () => {
  const renderHeader = () => {
    return render(
      <BrowserRouter>
        <Header />
      </BrowserRouter>
    );
  };

  it('deve renderizar o botão de navegação composto por três linhas horizontais', () => {
    renderHeader();

    const menuButton = screen.getByRole('button', { name: /abrir menu de navegação/i });
    expect(menuButton).toBeInTheDocument();
  });

  it('deve abrir o Drawer lateral de navegação quando o visitante clicar no botão de menu', () => {
    renderHeader();

    expect(screen.queryByRole('dialog', { name: /menu de navegação/i })).not.toBeInTheDocument();

    const menuButton = screen.getByRole('button', { name: /abrir menu de navegação/i });
    fireEvent.click(menuButton);

    expect(screen.getByRole('dialog', { name: /menu de navegação/i })).toBeInTheDocument();

    const closeButton = screen.getByRole('button', { name: /fechar menu/i });
    fireEvent.click(closeButton);

    expect(screen.queryByRole('dialog', { name: /menu de navegação/i })).not.toBeInTheDocument();
  });
});
