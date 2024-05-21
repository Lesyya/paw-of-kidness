import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

import type { Option } from '@/types/option';

// eslint-disable-next-line import/prefer-default-export
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs));

export const getOptions = (options: Record<string | number, string>): Option[] => {
  return Object.entries(options).map(([key, value]) => {
    return {
      value: key,
      label: value,
    };
  });
};
