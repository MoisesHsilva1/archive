import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { Category, CATEGORY_OPTIONS } from '@/enums/category.enum';

export interface SelectFieldProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'value' | 'onChange'> {
  value?: Category;
  onChange?: (value: Category) => void;
  hasError?: boolean;
}

export const SelectField = React.forwardRef<HTMLSelectElement, SelectFieldProps>(
  ({ className, value, onChange, hasError, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          value={value}
          onChange={(e) => onChange?.(e.target.value as Category)}
          className={twMerge(
            clsx(
              'w-full bg-background-surface text-text-primary px-3.5 py-2.5 text-sm rounded-[2px] border transition-colors duration-150 appearance-none cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-primary',
              hasError
                ? 'border-red-500/80 focus-visible:ring-red-500'
                : 'border-border hover:border-neutral-700 focus-visible:border-text-primary',
              className
            )
          )}
          {...props}
        >
          {CATEGORY_OPTIONS.map((option) => (
            <option
              key={option.value}
              value={option.value}
              className="bg-background-secondary text-text-primary py-1"
            >
              {option.label}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-text-muted">
          <span className="text-xs">▼</span>
        </div>
      </div>
    );
  }
);

SelectField.displayName = 'SelectField';
