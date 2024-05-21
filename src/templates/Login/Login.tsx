import React from 'react';
import Link from 'next/link';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';

import { LoadingButton } from '@/components/AppButton';
import AppForm from '@/components/AppForm';
import FormInput from '@/components/form/FormInput';
import { loginSchema } from '@/server/schemas/auth';
import useAuth from '@/context/auth/useAuth';
import useToast from '@/components/toast/useToast';
import api from '@/api';

import type { z } from 'zod';

type LoginValues = z.infer<typeof loginSchema>;

const Login: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { refetchUser } = useAuth();

  const form = useForm<LoginValues>({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const redirect = router.query.redirect as string;

  const { mutate: login, isPending } = api.auth.login.useMutation({
    onError: error => {
      toast({
        title: 'Помилка!',
        description: error.message,
        variant: 'destructive',
      });
    },
    onSuccess: async () => {
      toast({
        title: 'Успіх!',
        description: 'Ви успішно увійшли в аккаунт',
      });

      refetchUser();
      await router.push(redirect ?? '/animals');
    },
  });

  const handleLogin = (values: LoginValues): void => {
    login(values);
  };

  return (
    <div className="flex w-full flex-1 items-center justify-center">
      <div className="flex max-w-[400px] flex-1 flex-col items-center gap-10">
        <div className="flex flex-col gap-4 text-center">
          <h1 className="font-h1 text-orange-900">Вхід</h1>
          <h2 className="font-h4 text-orange-700">Перед заповненням анкети потрібно увійти в аккаунт</h2>
        </div>

        <AppForm {...form}>
          <form className="flex w-full flex-col items-center gap-8" onSubmit={form.handleSubmit(handleLogin)}>
            <FormInput //
              control={form.control}
              name="email"
              label="Email"
              placeholder="Введіть свою пошту"
              message
            />

            <FormInput //
              control={form.control}
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
                Увійти
              </LoadingButton>

              <div className="flex items-center justify-center gap-4">
                <p className="whitespace-nowrap">Немає акаунта?</p>
                <Link className="text-orange-400 underline" href={`/register?redirect=${redirect}`}>
                  Реєстрація
                </Link>
              </div>
            </div>
          </form>
        </AppForm>
      </div>
    </div>
  );
};

export default Login;
