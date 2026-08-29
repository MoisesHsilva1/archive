import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { CreatePage } from '@/pages/create-page';
import * as useAuthModule from '@/hooks/useAuth';
import * as useReviewMutationModule from '@/hooks/useReviewMutation';

vi.mock('@/hooks/useAuth', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/hooks/useReviewMutation', () => ({
  useReviewMutation: vi.fn(),
}));

describe('CreatePage integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('deve exibir o AuthGuardCard quando o usuário não estiver autenticado', () => {
    vi.mocked(useAuthModule.useAuth).mockReturnValue({
      user: null,
      isAuthenticated: false,
      isLoading: false,
      error: null,
      login: vi.fn(),
      logout: vi.fn(),
    });

    vi.mocked(useReviewMutationModule.useReviewMutation).mockReturnValue({
      publishReview: vi.fn(),
      isSubmitting: false,
      uploadProgress: null,
      error: null,
      successItem: null,
      resetMutation: vi.fn(),
    });

    render(
      <MemoryRouter>
        <CreatePage />
      </MemoryRouter>
    );

    expect(screen.getByText(/Área do Proprietário/i)).toBeInTheDocument();
    expect(screen.getByText(/Autenticação Necessária/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Acessar Criação/i })
    ).toBeInTheDocument();
  });

  it('deve exibir o formulário de criação quando o usuário estiver autenticado', () => {
    vi.mocked(useAuthModule.useAuth).mockReturnValue({
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

    vi.mocked(useReviewMutationModule.useReviewMutation).mockReturnValue({
      publishReview: vi.fn(),
      isSubmitting: false,
      uploadProgress: null,
      error: null,
      successItem: null,
      resetMutation: vi.fn(),
    });

    render(
      <MemoryRouter>
        <CreatePage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole('heading', { name: /Registrar Experiência/i })
    ).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Título do Lugar \/ Experiência/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Publicar no Acervo/i })
    ).toBeInTheDocument();
  });
});
