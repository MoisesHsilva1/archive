import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Lock, AlertCircle } from 'lucide-react';
import { authCredentialsSchema, AuthCredentialsFormValues } from '@/schemas/auth.schema';
import { Input } from '@/components/atoms/input';
import { Button } from '@/components/atoms/button';
import { Spinner } from '@/components/atoms/spinner';

export interface AuthGuardCardProps {
  onLogin: (credentials: AuthCredentialsFormValues) => Promise<void>;
  isLoading?: boolean;
  externalError?: string | null;
}

export const AuthGuardCard: React.FC<AuthGuardCardProps> = ({
  onLogin,
  isLoading = false,
  externalError,
}) => {
  const [localError, setLocalError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthCredentialsFormValues>({
    resolver: zodResolver(authCredentialsSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: AuthCredentialsFormValues) => {
    setLocalError(null);
    try {
      await onLogin(data);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Credenciais inválidas ou erro de autenticação';
      setLocalError(message);
    }
  };

  const displayError = externalError || localError;

  return (
    <div className="w-full max-w-md mx-auto p-6 sm:p-8 bg-background-secondary border border-border rounded-[2px]">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 rounded-[2px] bg-background-surface border border-border flex items-center justify-center">
          <Lock className="w-4 h-4 text-text-secondary" />
        </div>
        <div>
          <h2 className="font-display font-bold text-lg text-text-primary tracking-tight">
            Área do Proprietário
          </h2>
          <p className="text-xs text-text-muted font-mono uppercase tracking-widest">
            Autenticação Necessária
          </p>
        </div>
      </div>

      {displayError && (
        <div
          role="alert"
          className="mb-5 p-3 bg-red-950/30 border border-red-800/50 rounded-[2px] flex items-start gap-2.5"
        >
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
          <p className="text-xs text-red-200 leading-relaxed">{displayError}</p>
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label
            htmlFor="email-input"
            className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5"
          >
            E-mail
          </label>
          <Input
            id="email-input"
            type="email"
            placeholder="proprietario@archive.io"
            hasError={Boolean(errors.email)}
            disabled={isLoading}
            autoComplete="email"
            {...register('email')}
          />
          {errors.email && (
            <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
          )}
        </div>

        <div>
          <label
            htmlFor="password-input"
            className="block text-xs font-mono uppercase tracking-wider text-text-secondary mb-1.5"
          >
            Senha
          </label>
          <Input
            id="password-input"
            type="password"
            placeholder="••••••••"
            hasError={Boolean(errors.password)}
            disabled={isLoading}
            autoComplete="current-password"
            {...register('password')}
          />
          {errors.password && (
            <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          variant="primary"
          className="w-full mt-2"
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Spinner size="sm" />
              <span>Verificando...</span>
            </span>
          ) : (
            'Acessar Criação'
          )}
        </Button>
      </form>
    </div>
  );
};
