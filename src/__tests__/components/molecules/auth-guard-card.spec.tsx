import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AuthGuardCard } from '@/components/molecules/auth-guard-card';

describe('AuthGuardCard component', () => {
  it('deve renderizar campos de e-mail e senha e botão de acesso', () => {
    render(<AuthGuardCard onLogin={vi.fn()} />);

    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Senha/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Acessar Criação/i })
    ).toBeInTheDocument();
  });

  it('deve exibir erros de validação ao submeter formulário vazio', async () => {
    const user = userEvent.setup();
    const handleLogin = vi.fn();
    render(<AuthGuardCard onLogin={handleLogin} />);

    await user.click(screen.getByRole('button', { name: /Acessar Criação/i }));

    await waitFor(() => {
      expect(screen.getByText(/Informe um e-mail válido/i)).toBeInTheDocument();
      expect(
        screen.getByText(/A senha deve ter pelo menos 6 caracteres/i)
      ).toBeInTheDocument();
    });

    expect(handleLogin).not.toHaveBeenCalled();
  });

  it('deve chamar onLogin ao preencher credenciais válidas', async () => {
    const user = userEvent.setup();
    const handleLogin = vi.fn().mockResolvedValue(undefined);
    render(<AuthGuardCard onLogin={handleLogin} />);

    await user.type(
      screen.getByLabelText(/E-mail/i),
      'owner@archive.io'
    );
    await user.type(screen.getByLabelText(/Senha/i), 'password123');
    await user.click(screen.getByRole('button', { name: /Acessar Criação/i }));

    await waitFor(() => {
      expect(handleLogin).toHaveBeenCalledWith({
        email: 'owner@archive.io',
        password: 'password123',
      });
    });
  });

  it('deve exibir mensagem de erro externo quando fornecida', () => {
    render(
      <AuthGuardCard
        onLogin={vi.fn()}
        externalError="Credenciais incorretas no Firebase"
      />
    );

    expect(
      screen.getByText(/Credenciais incorretas no Firebase/i)
    ).toBeInTheDocument();
  });
});
