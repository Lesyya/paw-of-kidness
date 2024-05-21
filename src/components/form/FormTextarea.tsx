import React from 'react';

import {
  AppFormField,
  AppFormLabel,
  AppFormControl,
  AppFormItem,
  AppFormMessage,
  AppFormDescription,
} from '@/components/AppForm';
import AppTextarea from '@/components/AppTextarea';

import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

type AdditionalProps = {
  label?: string;
  description?: string;
  placeholder?: string;
  message?: string | boolean;
  className?: string;
};

const FormTextarea = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  label,
  description,
  placeholder,
  message,
  control,
  name,
  className,
}: Omit<ControllerProps<TFieldValues, TName>, 'render'> & AdditionalProps) => {
  return (
    <AppFormField
      control={control}
      name={name}
      render={({ field }) => (
        <AppFormItem>
          {label && <AppFormLabel>{label}</AppFormLabel>}
          <AppFormControl>
            <AppTextarea className={className} placeholder={placeholder} {...field} />
          </AppFormControl>
          {description && <AppFormDescription>{description}</AppFormDescription>}
          {message && <AppFormMessage>{message}</AppFormMessage>}
        </AppFormItem>
      )}
    />
  );
};

export default FormTextarea;
