import React from 'react';
import { useRouter } from 'next/router';

import AppHeader from '@/templates/AppLayout/AppHeader/AppHeader';
import AppFooter from '@/templates/AppLayout/AppFooter/AppFooter';
import { cn } from '@/utils';
import AppPreScreen from '@/components/AppPreScreen';
import useAuth from '@/context/auth/useAuth';
import AppToaster from '@/components/toast/AppToaster';

export type AppLayoutProps = {
  children: React.ReactNode;
};

const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const { loading } = useAuth();
  const router = useRouter();

  const transparent = router.asPath === '/';

  const className: string = cn(
    'flex min-h-screen flex-col items-center',
    transparent ? 'bg-main bg-cover bg-no-repeat' : 'bg-orange-50',
  );

  return (
    <div className={className}>
      <AppToaster />

      <AppPreScreen visible={loading} />

      <nav className={cn('w-full flex justify-center px-10 sticky top-0 z-20', !transparent && 'bg-dark-orange')}>
        <AppHeader />
      </nav>

      <div className="flex w-full flex-1 flex-col items-center p-10">
        <main className="flex w-full max-w-[1440px] flex-1 flex-col items-center ">{children}</main>
      </div>

      <footer className="flex w-full justify-center px-10">
        <AppFooter transparent={transparent} />
      </footer>
    </div>
  );
};

export default AppLayout;
