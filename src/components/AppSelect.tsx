import React from 'react';
import * as SelectPrimitive from '@radix-ui/react-select';
import Icon from '@mdi/react';
import { mdiCheck, mdiChevronDown, mdiChevronUp } from '@mdi/js';

import { cn } from '@/utils';

import type { Option } from '@/types/option';

export const AppSelectRoot = SelectPrimitive.Root;

export const AppSelectGroup = SelectPrimitive.Group;

export const AppSelectValue = SelectPrimitive.Value;

export const AppSelectTrigger = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-md border border-orange-300 bg-white px-3 py-2 text-sm ring-offset-white placeholder:text-orange-900 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 [&>span]:text-orange-900',
      className,
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon asChild>
      <Icon path={mdiChevronDown} className="size-4 text-orange-400 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
));
AppSelectTrigger.displayName = SelectPrimitive.Trigger.displayName;

export const AppSelectScrollUpButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollUpButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <Icon path={mdiChevronUp} className="size-4" />
  </SelectPrimitive.ScrollUpButton>
));
AppSelectScrollUpButton.displayName = SelectPrimitive.ScrollUpButton.displayName;

export const AppSelectScrollDownButton = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.ScrollDownButton>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton
    ref={ref}
    className={cn('flex cursor-default items-center justify-center py-1', className)}
    {...props}
  >
    <Icon path={mdiChevronDown} className="size-4" />
  </SelectPrimitive.ScrollDownButton>
));
AppSelectScrollDownButton.displayName = SelectPrimitive.ScrollDownButton.displayName;

export const AppSelectContent = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border border-orange-300 bg-white text-orange-700 shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' &&
          'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className,
      )}
      position={position}
      {...props}
    >
      <AppSelectScrollUpButton />
      <SelectPrimitive.Viewport
        className={cn(
          'p-1',
          position === 'popper' &&
            'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]',
        )}
      >
        {children}
      </SelectPrimitive.Viewport>
      <AppSelectScrollDownButton />
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
));
AppSelectContent.displayName = SelectPrimitive.Content.displayName;

export const AppSelectLabel = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Label>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn('py-1.5 pl-8 pr-2 text-sm font-semibold', className)} {...props} />
));
AppSelectLabel.displayName = SelectPrimitive.Label.displayName;

export const AppSelectItem = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Item>,
  { value: string | number | boolean; className?: string; children: React.ReactNode }
>(({ className, children, value }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none cursor-pointer focus:bg-orange-100 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      className,
    )}
    value={value as string}
  >
    <span className="absolute left-2 flex size-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Icon path={mdiCheck} className="size-4" />
      </SelectPrimitive.ItemIndicator>
    </span>

    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
));
AppSelectItem.displayName = SelectPrimitive.Item.displayName;

export const AppSelectSeparator = React.forwardRef<
  React.ElementRef<typeof SelectPrimitive.Separator>,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-orange-100', className)} {...props} />
));
AppSelectSeparator.displayName = SelectPrimitive.Separator.displayName;

export type AppSelectProps = {
  options: Option[];
  className?: string;
  placeholder: string;
  title?: string;
  onChange?: (value: string) => void;
  value?: string;
};

const AppSelect: React.FC<AppSelectProps> = ({
  options, //
  title,
  placeholder,
  className,
  onChange,
  value,
}) => {
  return (
    <AppSelectRoot onValueChange={onChange} defaultValue={value}>
      <AppSelectTrigger className={cn('w-[180px]', className)}>
        <AppSelectValue placeholder={placeholder} />
      </AppSelectTrigger>
      <AppSelectContent>
        <AppSelectGroup>
          {title && <AppSelectLabel>{title}</AppSelectLabel>}

          {options.map(option => (
            <AppSelectItem key={option.label} value={option.value}>
              {option.label}
            </AppSelectItem>
          ))}
        </AppSelectGroup>
      </AppSelectContent>
    </AppSelectRoot>
  );
};

export default AppSelect;
