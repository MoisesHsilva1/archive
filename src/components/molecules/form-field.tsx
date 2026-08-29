import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  error?: string;
  required?: boolean;
  hint?: string;
  className?: string;
  children: React.ReactNode;
}

export const FormField: React.FC<FormFieldProps> = ({
  label,
  htmlFor,
  error,
  required = false,
  hint,
  className,
  children,
}) => {
  return (
    <div className={twMerge(clsx('space-y-1.5', className))}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={htmlFor}
          className="text-xs font-mono uppercase tracking-wider text-text-secondary flex items-center gap-1"
        >
          <span>{label}</span>
          {required && <span className="text-red-400">*</span>}
        </label>
        {hint && (
          <span className="text-[11px] font-mono text-text-muted">{hint}</span>
        )}
      </div>

      {children}

      {error && (
        <p role="alert" className="text-xs text-red-400">
          {error}
        </p>
      )}
    </div>
  );
};
