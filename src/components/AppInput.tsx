import React from 'react';

import { cn } from '@/utils';

export type AppInputProps = React.InputHTMLAttributes<HTMLInputElement>;

const AppInput = React.forwardRef<HTMLInputElement, AppInputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        'flex h-10 w-full rounded-md border border-orange-200 bg-white px-3 py-2 text-orange-900 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-orange-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
        className,
      )}
      ref={ref}
      {...props}
    />
  );
});
AppInput.displayName = 'AppInput';

export default AppInput;
