import React from 'react';

import {
  AppFormField,
  AppFormLabel,
  AppFormControl,
  AppFormItem,
  AppFormMessage,
  AppFormDescription,
} from '@/components/AppForm';
import {
  AppSelectContent,
  AppSelectItem,
  AppSelectRoot,
  AppSelectTrigger,
  AppSelectValue,
} from '@/components/AppSelect';

import type { Option } from '@/types/option';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

type AdditionalProps = {
  label?: string;
  description?: string;
  placeholder?: string;
  message?: string | boolean;
  options: Option[];
};

const FormInput = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  label,
  description,
  placeholder,
  message,
  control,
  name,
  options,
}: Omit<ControllerProps<TFieldValues, TName>, 'render'> & AdditionalProps) => {
  return (
    <AppFormField
      control={control}
      name={name}
      render={({ field }) => (
        <AppFormItem>
          {label && <AppFormLabel>{label}</AppFormLabel>}
          <AppSelectRoot onValueChange={field.onChange} defaultValue={field.value} value={field.value}>
            <AppFormControl>
              <AppSelectTrigger>
                <AppSelectValue placeholder={placeholder} />
              </AppSelectTrigger>
            </AppFormControl>
            <AppSelectContent>
              {options.map(option => (
                <AppSelectItem key={option.label} value={option.value}>
                  {option.label}
                </AppSelectItem>
              ))}
            </AppSelectContent>
          </AppSelectRoot>

          {description && <AppFormDescription>{description}</AppFormDescription>}
          {message && <AppFormMessage>{message}</AppFormMessage>}
        </AppFormItem>
      )}
    />
  );
};

export default FormInput;
