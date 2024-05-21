import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva } from 'class-variance-authority';
import Icon from '@mdi/react';
import { mdiLoading } from '@mdi/js';

import { cn } from '@/utils';

import type { VariantProps } from 'class-variance-authority';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-400 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-orange-500 text-white hover:bg-orange-700',
        link: 'text-white underline-offset-4 hover:underline',
        ghost: 'hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-slate-50',
        outline: 'border border-orange-200 hover:bg-orange-300',
        subtle: 'bg-orange-100 text-black hover:bg-orange-500 hover:text-white',
        'form-light': 'text-white outline outline-white hover:bg-orange-700 hover:outline-0',
        'form-dark':
          'text-dark-orange outline outline-dark-orange hover:bg-orange-700 hover:text-white hover:outline-0',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

const AppButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return <Comp className={cn(buttonVariants({ variant, className }))} ref={ref} {...props} />;
  },
);
AppButton.displayName = 'Button';

export const LoadingButton = React.forwardRef<HTMLButtonElement, ButtonProps & { loading?: boolean }>(
  ({ children, ...props }, ref) => (
    <AppButton {...props} disabled={props.loading || props.disabled} ref={ref}>
      {props.loading && <Icon path={mdiLoading} className="mr-2 size-6 animate-spin" />}
      {children}
    </AppButton>
  ),
);
LoadingButton.displayName = 'LoadingButton';

export default AppButton;
