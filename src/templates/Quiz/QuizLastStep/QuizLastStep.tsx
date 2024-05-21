import React from 'react';

import QuizCriteria from './QuizCriteria';

import type { Control } from 'react-hook-form';
import type { QuizValues } from '../Quiz';

export type QuizLastStepProps = {
  control: Control<QuizValues>;
};

const QuizLastStep: React.FC<QuizLastStepProps> = ({ control }) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <h1 className="font-h1 text-orange-900">Оцініть наскільки Вам важливі критерії</h1>
      <h2 className="font-h4 text-orange-700">Це зроблено, для кращого підбирання Вам тваринки</h2>

      <div className="font-h4 mb-8 flex flex-col gap-2">
        <div>1 - не важливо</div>
        <div>3 - важливо</div>
        <div>5 - дуже важливо</div>
      </div>

      <div className="flex max-w-[700px] flex-wrap items-center justify-center gap-10">
        <QuizCriteria control={control} name="preference.kindImportance" title="Рід (кіт чи пес)" />
        <QuizCriteria control={control} name="preference.sexImportance" title="Стать" />
        <QuizCriteria control={control} name="preference.ageImportance" title="Вік" />
        <QuizCriteria control={control} name="preference.breedImportance" title="Порода" />
        <QuizCriteria control={control} name="preference.sizeImportance" title="Розмір" />
        <QuizCriteria control={control} name="preference.colorImportance" title="Колір" />
        <QuizCriteria control={control} name="preference.sterilizedImportance" title="Стерилізація" />
      </div>
    </div>
  );
};

export default QuizLastStep;
