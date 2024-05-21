import React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import Icon from '@mdi/react';
import { mdiCircle } from '@mdi/js';

import { cn } from '@/utils';

const AppRadioGroup = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Root>,
  { className?: string; onValueChange: (value: string) => void; value: string | number }
>(({ className, value, ...props }, ref) => {
  return (
    <RadioGroupPrimitive.Root className={cn('grid gap-2', className)} value={value as string} {...props} ref={ref} />
  );
});
AppRadioGroup.displayName = RadioGroupPrimitive.Root.displayName;

const AppRadio = React.forwardRef<
  React.ElementRef<typeof RadioGroupPrimitive.Item>,
  { className?: string; value: number | string | boolean; id: string }
>(({ className, value, id }, ref) => {
  return (
    <RadioGroupPrimitive.Item
      ref={ref}
      className={cn(
        'aspect-square bg-white h-4 w-4 rounded-full border border-orange-200 text-black ring-offset-white focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-slate-800 dark:border-slate-50 dark:text-slate-50 dark:ring-offset-slate-950 dark:focus-visible:ring-slate-300',
        className,
      )}
      value={value as string}
      id={id}
    >
      <RadioGroupPrimitive.Indicator className="flex items-center justify-center">
        <Icon path={mdiCircle} className="size-2.5 fill-current text-current" />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  );
});
AppRadio.displayName = RadioGroupPrimitive.Item.displayName;

export { AppRadioGroup, AppRadio };
