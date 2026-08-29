import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { CheckCircle2, ArrowRight, PlusCircle } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { useReviewMutation } from '@/hooks/useReviewMutation';
import { CreateLayout } from '@/components/templates/create-layout';
import { AuthGuardCard } from '@/components/molecules/auth-guard-card';
import { CreateItemForm, CreateItemFormSubmitData } from '@/components/organisms/create-item-form';
import { Button } from '@/components/atoms/button';
import { Spinner } from '@/components/atoms/spinner';

export const CreatePage: React.FC = () => {
  const { user, isAuthenticated, isLoading: isAuthLoading, login, logout, error: authError } = useAuth();
  const { publishReview, isSubmitting, uploadProgress, error: mutationError, successItem, resetMutation } =
    useReviewMutation();
  const [createdAnother, setCreatedAnother] = useState(false);

  const handleSubmit = async (data: CreateItemFormSubmitData) => {
    if (!user) return;
    await publishReview(data, user);
  };

  const handleCreateAnother = () => {
    resetMutation();
    setCreatedAnother((prev) => !prev);
  };

  if (isAuthLoading) {
    return (
      <CreateLayout>
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-3">
          <Spinner size="lg" />
          <p className="text-xs font-mono text-text-muted uppercase tracking-widest">
            Verificando Sessão...
          </p>
        </div>
      </CreateLayout>
    );
  }

  if (!isAuthenticated || !user) {
    return (
      <CreateLayout>
        <div className="py-8 sm:py-16">
          <AuthGuardCard
            onLogin={async (credentials) => {
              await login(credentials);
            }}
            isLoading={isAuthLoading}
            externalError={authError}
          />
        </div>
      </CreateLayout>
    );
  }

  if (successItem) {
    return (
      <CreateLayout user={user} onLogout={logout}>
        <div className="max-w-md mx-auto py-12 text-center space-y-6 bg-background-secondary p-8 border border-border rounded-[2px]">
          <div className="w-12 h-12 mx-auto rounded-full bg-neutral-900 border border-border flex items-center justify-center text-text-primary">
            <CheckCircle2 className="w-6 h-6 text-text-primary" />
          </div>

          <div className="space-y-2">
            <h2 className="font-display font-bold text-2xl text-text-primary tracking-tight">
              Publicado com Sucesso!
            </h2>
            <p className="text-xs font-mono uppercase tracking-widest text-text-muted">
              {successItem.title}
            </p>
            <p className="text-sm text-text-secondary leading-relaxed pt-2">
              Sua recomendação já faz parte do acervo do Archive em tempo real.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3 pt-4 justify-center">
            <Button
              variant="secondary"
              size="md"
              onClick={handleCreateAnother}
              className="gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Criar Outra</span>
            </Button>

            <NavLink to="/#acervo" className="focus-visible:outline-none">
              <Button variant="primary" size="md" className="w-full gap-2">
                <span>Ver no Acervo</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </NavLink>
          </div>
        </div>
      </CreateLayout>
    );
  }

  return (
    <CreateLayout user={user} onLogout={logout}>
      <div className="mb-8">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-text-muted mb-2">
          <span>Área do Proprietário</span>
          <span>//</span>
          <span>Nova Entrada</span>
        </div>
        <h1 className="font-display font-bold text-2xl sm:text-4xl text-text-primary tracking-tight">
          Registrar Experiência
        </h1>
      </div>

      <CreateItemForm
        key={createdAnother ? 'form-reset' : 'form-initial'}
        onSubmit={handleSubmit}
        isLoading={isSubmitting}
        uploadProgress={uploadProgress}
        serverError={mutationError}
      />
    </CreateLayout>
  );
};
