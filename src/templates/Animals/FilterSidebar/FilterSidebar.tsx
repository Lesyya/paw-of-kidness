import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/router';
import Icon from '@mdi/react';
import { mdiClose } from '@mdi/js';

import AppButton from '@/components/AppButton';
import AppForm from '@/components/AppForm';
import FormSelect from '@/components/form/FormSelect';
import FormSwitch from '@/components/form/FormSwitch';
import { getAnimalsSchema } from '@/server/schemas/animal';
import { getOptions } from '@/utils';
import {
  AnimalAgeEnum,
  AnimalBreedEnum,
  AnimalColorEnum,
  AnimalKindEnum,
  AnimalSexEnum,
  AnimalSizeEnum,
} from '@/types/animal';

import type { z } from 'zod';

type FilterValues = z.infer<typeof getAnimalsSchema>;

const FilterSidebar: React.FC = () => {
  const router = useRouter();

  const form = useForm<FilterValues>({
    mode: 'all',
    resolver: zodResolver(getAnimalsSchema),
    defaultValues: {
      ...router.query,
      isSterilized: router.query.isSterilized ? router.query.isSterilized === 'true' : undefined,
    } as FilterValues,
  });

  const handleApplyFilters = async (values: FilterValues): Promise<void> => {
    const filteredValues = Object.fromEntries(
      Object.entries(values).filter(([, value]) => value !== undefined && value !== null && value !== ''),
    );

    await router.push({
      query: {
        ...filteredValues,
        status: router.query.status ? router.query.status : undefined,
      },
    });
  };

  const handleRemoveFilter = (key: string): void => {
    form.reset({
      ...form.getValues(),
      [key]: null,
    });
  };

  return (
    <div>
      <h3 className="font-h3 mb-4 text-center text-orange-700">Фільтри</h3>

      <AppForm {...form}>
        <form
          className="grid grid-cols-[1fr_36px] items-center justify-start gap-x-2 gap-y-4"
          onSubmit={form.handleSubmit(handleApplyFilters)}
        >
          <FormSelect //
            placeholder="Рід"
            name="kind"
            control={form.control}
            options={getOptions(AnimalKindEnum)}
          />
          <AppButton variant="subtle" type="button" onClick={() => handleRemoveFilter('kind')}>
            <Icon path={mdiClose} />
          </AppButton>

          <FormSelect //
            placeholder="Стать"
            name="sex"
            control={form.control}
            options={getOptions(AnimalSexEnum)}
          />
          <AppButton variant="subtle" type="button" onClick={() => handleRemoveFilter('sex')}>
            <Icon path={mdiClose} />
          </AppButton>

          <FormSelect //
            placeholder="Вік"
            name="age"
            control={form.control}
            options={getOptions(AnimalAgeEnum)}
          />
          <AppButton variant="subtle" type="button" onClick={() => handleRemoveFilter('age')}>
            <Icon path={mdiClose} />
          </AppButton>

          <FormSelect //
            placeholder="Порода"
            name="breed"
            control={form.control}
            options={getOptions(AnimalBreedEnum)}
          />
          <AppButton variant="subtle" type="button" onClick={() => handleRemoveFilter('breed')}>
            <Icon path={mdiClose} />
          </AppButton>

          <FormSelect //
            placeholder="Розмір"
            name="size"
            control={form.control}
            options={getOptions(AnimalSizeEnum)}
          />
          <AppButton variant="subtle" type="button" onClick={() => handleRemoveFilter('size')}>
            <Icon path={mdiClose} />
          </AppButton>

          <FormSelect //
            placeholder="Колір"
            name="color"
            control={form.control}
            options={getOptions(AnimalColorEnum)}
          />
          <AppButton variant="subtle" type="button" onClick={() => handleRemoveFilter('color')}>
            <Icon path={mdiClose} />
          </AppButton>

          <FormSwitch //
            control={form.control}
            name="isSterilized"
            label="Стерилізація"
          />
          <AppButton variant="subtle" type="button" onClick={() => handleRemoveFilter('isSterilized')}>
            <Icon path={mdiClose} />
          </AppButton>

          <AppButton className="col-span-2 p-2" type="submit">
            Застосувати
          </AppButton>
        </form>
      </AppForm>
    </div>
  );
};

export default FilterSidebar;
