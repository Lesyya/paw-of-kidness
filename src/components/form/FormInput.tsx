import React from 'react';

import {
  AppFormField,
  AppFormLabel,
  AppFormControl,
  AppFormItem,
  AppFormMessage,
  AppFormDescription,
} from '@/components/AppForm';
import AppInput from '@/components/AppInput';
import AppPasswordInput from '@/components/AppPasswordInput';

import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

type AdditionalProps = {
  label?: string;
  description?: string;
  placeholder?: string;
  message?: string | boolean;
  password?: boolean;
  className?: string;
};

const FormInput = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  label,
  description,
  placeholder,
  message,
  control,
  name,
  className,
  password,
}: Omit<ControllerProps<TFieldValues, TName>, 'render'> & AdditionalProps) => {
  const InputComponent = password ? AppPasswordInput : AppInput;

  return (
    <AppFormField
      control={control}
      name={name}
      render={({ field }) => (
        <AppFormItem>
          {label && <AppFormLabel>{label}</AppFormLabel>}
          <AppFormControl>
            <InputComponent className={className} placeholder={placeholder} {...field} />
          </AppFormControl>
          {description && <AppFormDescription>{description}</AppFormDescription>}
          {message && <AppFormMessage>{message}</AppFormMessage>}
        </AppFormItem>
      )}
    />
  );
};

export default FormInput;
