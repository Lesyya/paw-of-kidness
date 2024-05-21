import React from 'react';

import { AppFormField, AppFormControl, AppFormItem, AppFormMessage, AppFormDescription } from '@/components/AppForm';
import AppSwitch from '@/components/AppSwitch';

import type { ControllerProps, FieldPath, FieldValues } from 'react-hook-form';

type AdditionalProps = {
  label?: string;
  description?: string;
  placeholder?: string;
  message?: string | boolean;
  password?: boolean;
};

const FormInput = <TFieldValues extends FieldValues, TName extends FieldPath<TFieldValues>>({
  label,
  description,
  message,
  control,
  name,
}: Omit<ControllerProps<TFieldValues, TName>, 'render'> & AdditionalProps) => {
  return (
    <AppFormField
      control={control}
      name={name}
      render={({ field }) => (
        <AppFormItem>
          <div className="flex items-center gap-2">
            <AppFormControl>
              <AppSwitch onCheckedChange={field.onChange} checked={field.value} />
            </AppFormControl>
            {label && <p className="text-orange-900">{label}</p>}
          </div>

          {description && <AppFormDescription>{description}</AppFormDescription>}
          {message && <AppFormMessage>{message}</AppFormMessage>}
        </AppFormItem>
      )}
    />
  );
};

export default FormInput;
