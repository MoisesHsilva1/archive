import React from 'react';
import { Star } from 'lucide-react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export interface RatingInputProps {
  value?: number;
  onChange: (value: number) => void;
  max?: number;
  className?: string;
  disabled?: boolean;
}

export const RatingInput: React.FC<RatingInputProps> = ({
  value = 0,
  onChange,
  max = 10,
  className,
  disabled = false,
}) => {
  return (
    <div className={twMerge(clsx('flex items-center gap-1.5 flex-wrap', className))}>
      {Array.from({ length: max }).map((_, index) => {
        const score = index + 1;
        const isFilled = score <= value;

        return (
          <button
            key={score}
            type="button"
            disabled={disabled}
            onClick={() => onChange(value === score ? 0 : score)}
            aria-label={`Nota ${score} de ${max}`}
            className={clsx(
              'p-1 rounded-[2px] transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-text-primary',
              isFilled ? 'text-text-primary' : 'text-text-muted hover:text-neutral-400',
              disabled && 'opacity-50 cursor-not-allowed'
            )}
          >
            <Star
              className={clsx('w-4 h-4', isFilled && 'fill-text-primary')}
            />
          </button>
        );
      })}
      <span className="text-xs font-mono text-text-secondary ml-2">
        {value > 0 ? `${value}/${max}` : 'Sem nota'}
      </span>
    </div>
  );
};
