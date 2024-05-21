import React from 'react';
import * as LabelPrimitive from '@radix-ui/react-label';

import { cn } from '@/utils';

export type AppLabelProps = React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>;

const AppLabel = React.forwardRef<React.ElementRef<typeof LabelPrimitive.Root>, AppLabelProps>(
  ({ className, ...props }, ref) => (
    <LabelPrimitive.Root
      ref={ref}
      className={cn(
        'text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70',
        className,
      )}
      {...props}
    />
  ),
);
AppLabel.displayName = 'AppLabel';

export default AppLabel;
