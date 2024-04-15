'use client';
import * as React from 'react';
import { cn } from '@/utils/cn';
import { EyeOff, Eye } from 'lucide-react';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, endIcon, startIcon, error, type, ...props }, ref) => {
    const [typeState, setTypeState] = React.useState(type);

    const isPassword = type === 'password';

    return (
      <div className='relative'>
        {startIcon && (
          <div
            className={cn(
              'pointer-events-none absolute inset-y-0 flex items-center px-3 ltr:left-0 rtl:right-0',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}>
            {startIcon}
          </div>
        )}
        <input
          type={typeState}
          className={cn(
            'flex h-12 w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error ? 'border-destructive' : 'border-input',
            startIcon ? 'ltr:pl-10 rtl:pr-10' : 'ltr:pl-3 rtl:pr-3',
            endIcon || isPassword ? 'ltr:pr-10 rtl:pl-10' : 'ltr:pr-3 rtl:pl-3',
            className
          )}
          ref={ref}
          {...props}
        />
        {endIcon && (
          <div
            className={cn(
              'pointer-events-none absolute inset-y-0 flex items-center px-3 ltr:right-0 rtl:left-0',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}>
            {endIcon}
          </div>
        )}
        {isPassword && !endIcon && (
          <button
            type='button'
            className={cn(
              'pointer-events-auto absolute inset-y-0 flex items-center rounded-md px-3 focus:outline-none focus-visible:ring-1 focus-visible:ring-ring ltr:right-0 rtl:left-0',
              error ? 'text-destructive' : 'text-muted-foreground'
            )}
            onClick={() => setTypeState(typeState === 'password' ? 'text' : 'password')}>
            {typeState === 'password' ? <Eye /> : <EyeOff />}
          </button>
        )}
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
