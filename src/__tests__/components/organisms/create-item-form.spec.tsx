import { describe, it, expect, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CreateItemForm } from '@/components/organisms/create-item-form';

describe('CreateItemForm component', () => {
  it('deve renderizar os campos principais do formulário', () => {
    render(<CreateItemForm onSubmit={vi.fn()} />);

    expect(
      screen.getByLabelText(/Título do Lugar \/ Experiência/i)
    ).toBeInTheDocument();
    expect(screen.getByLabelText(/Categoria/i)).toBeInTheDocument();
    expect(
      screen.getByLabelText(/Relato Editorial \/ Review/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /Publicar no Acervo/i })
    ).toBeInTheDocument();
  });

  it('deve exibir erros de validação ao submeter formulário sem dados obrigatórios', async () => {
    const user = userEvent.setup();
    const handleSubmit = vi.fn();

    render(<CreateItemForm onSubmit={handleSubmit} />);

    await user.click(screen.getByRole('button', { name: /Publicar no Acervo/i }));

    await waitFor(() => {
      expect(
        screen.getByText(/O título deve ter entre 2 e 120 caracteres/i)
      ).toBeInTheDocument();
      expect(
        screen.getByText(/O conteúdo ou relato é obrigatório/i)
      ).toBeInTheDocument();
    });

    expect(handleSubmit).not.toHaveBeenCalled();
  });
});
