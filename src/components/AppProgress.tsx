import React from 'react';
import * as ProgressPrimitive from '@radix-ui/react-progress';

import { cn } from '@/utils';

type AppProgressProps = Omit<React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root>, 'value'> & {
  current: number;
  total: number;
};

const AppProgress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, AppProgressProps>(
  ({ className, current, total, ...props }, ref) => {
    const value = (current / total) * 100;

    return (
      <div className="flex w-full items-center gap-10">
        <ProgressPrimitive.Root
          ref={ref}
          className={cn('relative h-4 w-full overflow-hidden rounded-full bg-orange-100', className)}
          {...props}
        >
          <ProgressPrimitive.Indicator
            className="size-full flex-1 rounded-lg bg-orange-900 transition-all"
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
          />
        </ProgressPrimitive.Root>

        <p>
          {current}/{total}
        </p>
      </div>
    );
  },
);
AppProgress.displayName = ProgressPrimitive.Root.displayName;

export default AppProgress;
