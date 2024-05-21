import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';
import { useRouter } from 'next/router';

import AppButton from '@/components/AppButton';
import HeaderLink from './HeaderLink';
import LogoImage from '@/assets/logo.png';
import useAuth from '@/context/auth/useAuth';
import useRequest from '@/context/request/useRequest';
import api from '@/api';
import useToast from '@/components/toast/useToast';

const AppHeader: React.FC = () => {
  const router = useRouter();
  const { toast } = useToast();
  const { authorized, loading, isAdmin, refetchUser } = useAuth();
  const { removeRequest } = useRequest();

  const { mutate: logout } = api.auth.logout.useMutation({
    onError: error => {
      toast({
        title: 'Помилка!',
        description: error.message,
        variant: 'destructive',
      });
    },
    onSuccess: async () => {
      toast({
        title: 'Успішно!',
        description: 'Ви вийшли з акаунту',
      });

      refetchUser();
      removeRequest();
      await router.push('/login');
    },
  });

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="flex max-w-[1440px] flex-1 items-center justify-between">
      <div className=" flex-1">
        <Link className="inline-block" href="/">
          <Image src={LogoImage} alt="Logo Лапа Добра" width={300} height={80} />
        </Link>
      </div>

      {isAdmin ? (
        <nav className="flex gap-8">
          <HeaderLink text="Тваринки" url="/animals" />
          <HeaderLink text="Заявки" url="/requests" />
        </nav>
      ) : (
        <nav className="flex gap-8">
          <HeaderLink text="Головна" url="/" />
          <HeaderLink text="Тваринки" url="/animals" />
          <HeaderLink text="Контакти" url="/contacts" />
        </nav>
      )}

      <div className="flex flex-1 items-center justify-end gap-8">
        {!loading &&
          (authorized ? (
            <AppButton className="font-h3 gap-5 px-4 py-2" variant="link" onClick={handleLogout}>
              <Icon path={mdiAccount} size="40px" />
              Вийти
            </AppButton>
          ) : (
            <HeaderLink text="Вхід" url="/login" accountIcon />
          ))}

        {isAdmin ? (
          <AppButton className="font-h3 min-w-[200px] px-4 py-1" variant="form-light" asChild>
            <Link href="/animals/create">Додати</Link>
          </AppButton>
        ) : (
          authorized && (
            <AppButton className="font-h3 min-w-[200px] px-4 py-1" variant="form-light" asChild>
              <Link href="/quiz">Анкета</Link>
            </AppButton>
          )
        )}
      </div>
    </div>
  );
};

export default AppHeader;
