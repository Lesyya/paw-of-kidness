import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';

import AppForm from '@/components/AppForm';
import AppButton, { LoadingButton } from '@/components/AppButton';
import FormInput from '@/components/form/FormInput';
import FormTextarea from '@/components/form/FormTextarea';
import FormSwitch from '@/components/form/FormSwitch';
import FormSelect from '@/components/form/FormSelect';
import FormRadioGroup from '@/components/form/FormRadioGroup';
import { createAnimalSchema } from '@/server/schemas/animal';
import { getOptions } from '@/utils';
import {
  AnimalSexEnum,
  AnimalAgeEnum,
  AnimalKindEnum,
  AnimalBreedEnum,
  AnimalSizeEnum,
  AnimalColorEnum,
} from '@/types/animal';
import { UserAgeEnum, UserPetsEnum, UserPlaceEnum, UserLifestyleEnum, UserTimeEnum } from '@/types/user';
import { criteriaOptions, booleanOptions } from '@/constants';
import api from '@/api';
import useToast from '@/components/toast/useToast';

import type { z } from 'zod';

type CreateAnimalValues = z.infer<typeof createAnimalSchema>;

const CreateAnimal: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();

  const form = useForm<CreateAnimalValues>({
    mode: 'all',
    resolver: zodResolver(createAnimalSchema),
    defaultValues: {
      isPriority: false,
      isSterilized: false,
    },
  });

  const { mutate: createAnimal, isPending } = api.animal.createAnimal.useMutation({
    onError: error => {
      toast({
        title: 'Помилка',
        description: error.message,
        variant: 'destructive',
      });
    },
    onSuccess: async data => {
      toast({
        title: 'Успішно',
        description: 'Тваринка успішно додана',
      });

      await router.push(`/animals/${data}`);
    },
  });

  const handleCreateAnimal = (values: CreateAnimalValues): void => {
    createAnimal(values);
  };

  return (
    <div className=" flex w-full flex-col items-center gap-4">
      <h1 className="font-h1 mb-4 text-orange-900">Додайте нову тваринку</h1>
      <h2 className="font-h2 text-orange-700">Тут Ви можете додати нову тваринку в базу волонтерів</h2>

      <AppForm {...form}>
        <form className="mt-8 flex w-full flex-col gap-6" onSubmit={form.handleSubmit(handleCreateAnimal)}>
          <div className="mt-8 flex w-full gap-4">
            <div className="flex grow-[3] flex-col gap-4 overflow-hidden rounded-lg bg-orange-100 p-4">
              <FormInput //
                control={form.control}
                name="name"
                placeholder="Введіть імʼя тваринки"
                className="placeholder:text-orange-900"
              />

              <FormInput //
                control={form.control}
                name="avatar_url"
                placeholder="Посилання на фото тварини"
                className="placeholder:text-orange-900"
              />

              <div className="grid grid-cols-2 gap-4">
                <FormSelect //
                  placeholder="Рід"
                  name="kind"
                  control={form.control}
                  options={getOptions(AnimalKindEnum)}
                />
                <FormSelect //
                  placeholder="Стать"
                  name="sex"
                  control={form.control}
                  options={getOptions(AnimalSexEnum)}
                />
                <FormSelect //
                  placeholder="Вік"
                  name="age"
                  control={form.control}
                  options={getOptions(AnimalAgeEnum)}
                />
                <FormSelect
                  placeholder="Порода"
                  name="breed"
                  control={form.control}
                  options={getOptions(AnimalBreedEnum)}
                />
                <FormSelect //
                  placeholder="Розмір"
                  name="size"
                  control={form.control}
                  options={getOptions(AnimalSizeEnum)}
                />
                <FormSelect //
                  placeholder="Колір"
                  name="color"
                  control={form.control}
                  options={getOptions(AnimalColorEnum)}
                />
                <FormSwitch //
                  control={form.control}
                  name="isSterilized"
                  label="Стерилізація"
                />
                <FormSwitch //
                  control={form.control}
                  name="isPriority"
                  label="Пріоритет"
                />
              </div>

              <FormTextarea //
                control={form.control}
                placeholder="Введіть опис тваринки"
                name="description"
                className="placeholder:text-orange-900"
              />
            </div>

            <div className="grid min-w-[400px] grid-cols-2 items-center gap-x-2 gap-y-1 rounded-lg bg-orange-100 p-4">
              <p className="text-center text-orange-900">Критерії</p>
              <p className="text-center text-orange-900">Важливість</p>

              <FormSelect //
                placeholder="Вік"
                name="preference.agePref"
                control={form.control}
                options={getOptions(UserAgeEnum)}
              />
              <FormRadioGroup //
                name="preference.ageImportance"
                control={form.control}
                options={criteriaOptions}
              />

              <FormSelect //
                placeholder="Діти"
                name="preference.childrenPref"
                control={form.control}
                options={booleanOptions}
              />
              <FormRadioGroup //
                name="preference.childrenImportance"
                control={form.control}
                options={criteriaOptions}
              />

              <FormSelect //
                placeholder="Тварини"
                name="preference.petPref"
                control={form.control}
                options={getOptions(UserPetsEnum)}
              />
              <FormRadioGroup //
                name="preference.petImportance"
                control={form.control}
                options={criteriaOptions}
              />

              <FormSelect //
                placeholder="Місце"
                name="preference.placePref"
                control={form.control}
                options={getOptions(UserPlaceEnum)}
              />
              <FormRadioGroup //
                name="preference.placeImportance"
                control={form.control}
                options={criteriaOptions}
              />

              <FormSelect //
                placeholder="Стиль життя"
                name="preference.lifestylePref"
                control={form.control}
                options={getOptions(UserLifestyleEnum)}
              />
              <FormRadioGroup //
                name="preference.lifestyleImportance"
                control={form.control}
                options={criteriaOptions}
              />

              <FormSelect //
                placeholder="Час"
                name="preference.timePref"
                control={form.control}
                options={getOptions(UserTimeEnum)}
              />
              <FormRadioGroup //
                name="preference.timeImportance"
                control={form.control}
                options={criteriaOptions}
              />

              <FormSelect //
                placeholder="Досвід"
                name="preference.experiencePref"
                control={form.control}
                options={booleanOptions}
              />
              <FormRadioGroup //
                name="preference.experienceImportance"
                control={form.control}
                options={criteriaOptions}
              />
            </div>
          </div>

          <LoadingButton
            type="submit"
            className="font-h4 min-w-[200px] self-center py-[14px]"
            loading={isPending}
            disabled={!form.formState.isValid}
          >
            Зберегти
          </LoadingButton>
        </form>
      </AppForm>
    </div>
  );
};

export default CreateAnimal;
