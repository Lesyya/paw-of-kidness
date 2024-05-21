import React, { useMemo, useState } from 'react';
import Image from 'next/image';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';

import DogImage from '@/assets/quiz_dog.png';
import AppButton, { LoadingButton } from '@/components/AppButton';
import AppProgress from '@/components/AppProgress';
import QuizStep from './QuizStep/QuizStep';
import QuizLastStep from './QuizLastStep/QuizLastStep';
import AppForm from '@/components/AppForm';
import { getOptions } from '@/utils';
import { UserAgeEnum, UserPetsEnum, UserPlaceEnum, UserLifestyleEnum, UserTimeEnum } from '@/types/user';
import {
  AnimalSexEnum,
  AnimalAgeEnum,
  AnimalKindEnum,
  AnimalBreedEnum,
  AnimalSizeEnum,
  AnimalColorEnum,
} from '@/types/animal';
import { createRequestSchema } from '@/server/schemas/request';
import api from '@/api';
import { booleanOptions } from '@/constants';
import QuizPlaceholder from '@/templates/Quiz/QuizPlaceholder/QuizPlaceholder';
import useAuth from '@/context/auth/useAuth';
import useToast from '@/components/toast/useToast';

import type { z } from 'zod';

export type QuizValues = z.infer<typeof createRequestSchema>;

const Quiz: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { user } = useAuth();

  const [step, setStep] = useState<number>(0);
  const [isReset, setIsReset] = useState<boolean>(false);

  const { data: request } = api.request.getUserRequest.useQuery();

  const { animalId } = router.query;
  const form = useForm<QuizValues>({
    mode: 'all',
    resolver: zodResolver(createRequestSchema),
    defaultValues: {
      animalId: animalId ? Number(animalId) : undefined,
    },
  });

  const {
    mutate: submitQuiz,
    isSuccess,
    isPending,
  } = api.request.createRequest.useMutation({
    onError: error => {
      toast({
        title: 'Помилка!',
        description: error.message,
        variant: 'destructive',
      });
    },
    onSuccess: () => {
      toast({
        title: 'Успіх!',
        description: 'Ви успішно створили анкету',
      });
    },
  });

  const isDisabled = useMemo<boolean>(() => {
    switch (step) {
      case 1:
        return form.watch('info.age') === undefined;
      case 2:
        return form.watch('info.children') === undefined;
      case 3:
        return form.watch('info.pet') === undefined;
      case 4:
        return form.watch('info.place') === undefined;
      case 5:
        return form.watch('info.lifestyle') === undefined;
      case 6:
        return form.watch('info.time') === undefined;
      case 7:
        return form.watch('info.experience') === undefined;
      case 8:
        return form.watch('preference.kindPref') === undefined;
      case 9:
        return form.watch('preference.sexPref') === undefined;
      case 10:
        return form.watch('preference.agePref') === undefined;
      case 11:
        return form.watch('preference.breedPref') === undefined;
      case 12:
        return form.watch('preference.sexPref') === undefined;
      case 13:
        return form.watch('preference.colorPref') === undefined;
      case 14:
        return form.watch('preference.sterilizedPref') === undefined;
      default:
        return true;
    }
  }, [step, form.watch()]);

  const handleSubmitQuiz = (values: QuizValues): void => {
    submitQuiz(values);
    setIsReset(false);
  };

  const handleReset = (): void => {
    setIsReset(true);
    setStep(0);
    form.reset();
  };

  const handleNextStep = (): void => {
    setStep(prev => prev + 1);
  };

  const handlePrevStep = (): void => {
    setStep(prev => prev - 1);
  };

  if (!isReset && (request || isSuccess)) {
    return (
      <div className="flex w-full flex-1 flex-col items-center gap-4">
        <h1 className="font-h2 text-orange-900">{`${user?.name} (ID ${user?.id})`}</h1>
        <QuizPlaceholder success={isSuccess} />

        <p className="text-orange-700">Хочете заповнити анкету ще раз? Попередня заявка буде видалена</p>
        <AppButton
          className="font-h4 min-w-[200px] px-8 py-[14px] text-orange-400"
          variant="link"
          onClick={handleReset}
        >
          Заповнити анкету
        </AppButton>
      </div>
    );
  }

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-4">
      {step > 0 && <AppProgress current={step} total={15} />}

      {step === 0 && (
        <>
          <h1 className="font-h1 text-orange-900">Анкета</h1>
          <h2 className="font-h4 text-orange-700">Щоб взяти тваринку, спочатку треба заповнити анкету!</h2>

          <Image src={DogImage} alt="Dog with a women" className="my-4 rounded-xl" width={850} height={500} />

          <AppButton className="font-h4 min-w-[200px] px-8 py-[14px]" onClick={handleNextStep}>
            Почати
          </AppButton>
        </>
      )}

      <AppForm {...form}>
        <form className="my-8 flex flex-1 flex-col" onSubmit={form.handleSubmit(handleSubmitQuiz)}>
          {step === 1 && (
            <QuizStep
              title="Який Ваш вік?"
              name="info.age"
              variant="human"
              options={getOptions(UserAgeEnum)}
              control={form.control}
            />
          )}

          {step === 2 && (
            <QuizStep
              title="Чи є у Вас маленькі діти?"
              name="info.children"
              variant="human"
              options={booleanOptions}
              control={form.control}
            />
          )}

          {step === 3 && (
            <QuizStep
              title="Чи є у вас інші собаки/кішки?"
              name="info.pet"
              variant="human"
              options={getOptions(UserPetsEnum)}
              control={form.control}
            />
          )}

          {step === 4 && (
            <QuizStep
              title="Куди плануєте взяти тваринку?"
              name="info.place"
              variant="human"
              options={getOptions(UserPlaceEnum)}
              control={form.control}
            />
          )}

          {step === 5 && (
            <QuizStep
              title="Наскільки Ви активна людина?"
              name="info.lifestyle"
              variant="human"
              options={getOptions(UserLifestyleEnum)}
              control={form.control}
            />
          )}

          {step === 6 && (
            <QuizStep
              title="Скільки часу Ви можете приділяти тваринці?"
              name="info.time"
              variant="human"
              options={getOptions(UserTimeEnum)}
              control={form.control}
            />
          )}

          {step === 7 && (
            <QuizStep
              title="Чи маєте досвід утримання тварин?"
              name="info.experience"
              variant="human"
              options={booleanOptions}
              control={form.control}
            />
          )}

          {step === 8 && (
            <QuizStep
              title="Котик чи собачка?"
              name="preference.kindPref"
              variant="animal"
              options={getOptions(AnimalKindEnum)}
              control={form.control}
            />
          )}

          {step === 9 && (
            <QuizStep
              title="Стать?"
              name="preference.sexPref"
              variant="animal"
              options={getOptions(AnimalSexEnum)}
              control={form.control}
            />
          )}

          {step === 10 && (
            <QuizStep
              title="Вік?"
              name="preference.agePref"
              variant="animal"
              options={getOptions(AnimalAgeEnum)}
              control={form.control}
            />
          )}

          {step === 11 && (
            <QuizStep
              title="Порода?"
              name="preference.breedPref"
              variant="animal"
              options={getOptions(AnimalBreedEnum)}
              control={form.control}
            />
          )}

          {step === 12 && (
            <QuizStep
              title="Розмір?"
              name="preference.sizePref"
              variant="animal"
              options={getOptions(AnimalSizeEnum)}
              control={form.control}
            />
          )}

          {step === 13 && (
            <QuizStep
              title="Колір?"
              name="preference.colorPref"
              variant="animal"
              options={getOptions(AnimalColorEnum)}
              control={form.control}
            />
          )}

          {step === 14 && (
            <QuizStep
              title="Чи стерелізована?"
              name="preference.sterilizedPref"
              variant="animal"
              options={booleanOptions}
              control={form.control}
            />
          )}

          {step === 15 && <QuizLastStep control={form.control} />}

          {step > 0 && (
            <div className="flex flex-1 items-end justify-center gap-6">
              {step > 1 && (
                <AppButton className="font-h4 min-w-[200px] py-[14px]" variant="subtle" onClick={handlePrevStep}>
                  Назад
                </AppButton>
              )}

              {step === 15 ? (
                <LoadingButton
                  className="font-h4 min-w-[200px] py-[14px]"
                  variant="subtle"
                  type="submit"
                  loading={isPending}
                  disabled={!form.formState.isValid}
                >
                  Відправити
                </LoadingButton>
              ) : (
                <AppButton
                  className="font-h4 min-w-[200px] py-[14px]"
                  variant="subtle"
                  onClick={handleNextStep}
                  disabled={isDisabled}
                >
                  Далі
                </AppButton>
              )}
            </div>
          )}
        </form>
      </AppForm>
    </div>
  );
};

export default Quiz;
