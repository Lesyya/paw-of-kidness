import React from 'react';

import {
  AppFormField,
  AppFormLabel,
  AppFormControl,
  AppFormItem,
  AppFormMessage,
  AppFormDescription,
} from '@/components/AppForm';
import { AppRadio, AppRadioGroup } from '@/components/AppRadioGroup';
import AppLabel from '@/components/AppLabel';

import type { Option } from '@/types/option';
import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

type AdditionalProps = {
  label?: string;
  description?: string;
  message?: string | boolean;
  options: Option[];
};

const FormRadioGroup = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  label,
  description,
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
          <AppFormControl>
            <AppRadioGroup
              className="flex items-center justify-center"
              onValueChange={field.onChange}
              value={field.value as unknown as string}
            >
              {options.map(option => (
                <div key={option.label} className="flex items-center space-x-2">
                  <AppRadio value={option.value} id={String(option.value)} />
                  <AppLabel htmlFor={String(option.value)}>{option.label}</AppLabel>
                </div>
              ))}
            </AppRadioGroup>
          </AppFormControl>
          {description && <AppFormDescription>{description}</AppFormDescription>}
          {message && <AppFormMessage>{message}</AppFormMessage>}
        </AppFormItem>
      )}
    />
  );
};

export default FormRadioGroup;
