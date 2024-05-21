import React from 'react';
import { Controller } from 'react-hook-form';

import AppButton from '@/components/AppButton';
import { cn } from '@/utils';

import type { Option } from '@/types/option';
import type { QuizValues } from '../Quiz';
import type { Control, FieldName } from 'react-hook-form';

export type QuizStepProps = {
  title: string;
  variant: 'human' | 'animal';
  control: Control<QuizValues>;
  name: FieldName<QuizValues>;
  options: Option[];
};

const QuizStep: React.FC<QuizStepProps> = ({
  title, //
  variant,
  options,
  control,
  name,
}) => {
  const description =
    variant === 'human' ? 'Будь ласка, заповніть інформацію про себе' : 'Будь ласка, опишіть, яку б Ви тваринку хотіли';

  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-h1 text-center text-orange-900">{title}</h1>
      <h2 className="font-h4 text-center text-orange-700">{description}</h2>

      <div className="mt-8 flex flex-col items-center gap-8">
        <Controller
          name={name}
          control={control}
          render={({ field }) => (
            <>
              {options.map(option => (
                <AppButton
                  key={option.label}
                  className={cn('min-w-[200px] px-8 py-[10px]', field.value === option.value && 'bg-orange-300')}
                  variant="outline"
                  onClick={() => field.onChange(option.value)}
                >
                  {option.label}
                </AppButton>
              ))}
            </>
          )}
        />
      </div>
    </div>
  );
};

export default QuizStep;
