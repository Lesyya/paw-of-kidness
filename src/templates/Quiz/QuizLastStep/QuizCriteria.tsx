import React from 'react';
import { Controller } from 'react-hook-form';

import { AppRadioGroup, AppRadio } from '@/components/AppRadioGroup';
import AppLabel from '@/components/AppLabel';
import { criteriaOptions } from '@/constants';

import type { Control, FieldName } from 'react-hook-form';
import type { QuizValues } from '@/templates/Quiz/Quiz';

export type QuizCriteriaProps = {
  title: string;
  control: Control<QuizValues>;
  name: FieldName<QuizValues>;
};

const QuizCriteria: React.FC<QuizCriteriaProps> = ({ title, control, name }) => {
  return (
    <div className="flex items-center gap-4">
      <p className="font-h4 text-center">{title}</p>
      <Controller
        name={name}
        control={control}
        render={({ field }) => (
          <AppRadioGroup onValueChange={field.onChange} value={field.value as string}>
            {criteriaOptions.map(option => (
              <div key={option.label} className="flex items-center space-x-2">
                <AppRadio value={option.value} id={String(option.value)} />
                <AppLabel htmlFor={String(option.value)}>{option.label}</AppLabel>
              </div>
            ))}
          </AppRadioGroup>
        )}
      />
    </div>
  );
};

export default QuizCriteria;
