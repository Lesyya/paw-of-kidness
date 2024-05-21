import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { LoadingButton } from '@/components/AppButton';
import AppForm from '@/components/AppForm';
import FormInput from '@/components/form/FormInput';
import api from '@/api';
import { registerSchema } from '@/server/schemas/auth';
import useAuth from '@/context/auth/useAuth';
import useToast from '@/components/toast/useToast';

import type { z } from 'zod';

type RegisterValues = z.infer<typeof registerSchema>;

// TODO(Sasha): Add redirects for protected/unprotected routes
const Register: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { refetchUser } = useAuth();

  const form = useForm<RegisterValues>({
    mode: 'all',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: '',
      number: '',
      email: '',
      password: '',
    },
  });

  const redirect = router.query.redirect as string;

  const { mutate: register, isPending } = api.auth.register.useMutation({
    onError: error => {
      toast({
        title: 'Помилка!',
        description: error.message,
        variant: 'destructive',
      });
    },
    onSuccess: async () => {
      refetchUser();
      await router.push(redirect ?? '/animals');
    },
  });

  const handleRegister = (values: RegisterValues): void => {
    register(values);
  };

  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <div className="flex max-w-[400px] flex-1 flex-col items-center gap-10">
        <h1 className="font-h1 text-orange-900">Реєстрація</h1>

        <AppForm {...form}>
          <form className="flex w-full flex-col items-center gap-8" onSubmit={form.handleSubmit(handleRegister)}>
            <FormInput
              control={form.control}
              name="name"
              label="Імʼя та Прізвище"
              placeholder="Введіть свої ім’я та прізвище"
              message
            />

            <FormInput
              control={form.control}
              name="number"
              label="Номер телефону"
              placeholder="Введіть номер телефону"
              message
            />

            <FormInput
              control={form.control} //
              name="email"
              label="Email"
              placeholder="Введіть свою пошту"
              message
            />

            <FormInput
              control={form.control} //
              name="password"
              label="Пароль"
              placeholder="Введіть пароль"
              password
              message
            />

            <div className="flex w-min flex-col items-center gap-4">
              <LoadingButton
                className="font-h4 w-full px-[10px] py-[14px]"
                type="submit"
                disabled={!form.formState.isValid}
                loading={isPending}
              >
                Зареєструватися
              </LoadingButton>

              <div className="flex items-center justify-center gap-4">
                <p className="whitespace-nowrap">Є аккаунт?</p>
                <Link className="text-orange-400 underline" href={`/login?redirect=${redirect}`}>
                  Увійти
                </Link>
              </div>
            </div>
          </form>
        </AppForm>
      </div>
    </div>
  );
};

export default Register;
