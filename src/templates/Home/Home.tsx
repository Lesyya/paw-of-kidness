import React from 'react';
import Link from 'next/link';

import AppButton from '@/components/AppButton';
import useAuth from '@/context/auth/useAuth';

const Home: React.FC = () => {
  const { authorized } = useAuth();

  return (
    <div className="mb-20 flex w-full flex-1 flex-col justify-center gap-4 text-white">
      <div className=" max-w-[850px]">
        <h1 className="font-h1-garamond mb-4">Лапа Добра</h1>
        <h2 className="font-h2-garamond">Благодійний сервіс з пошуку домівки для тваринок.</h2>
        <p className="font-h3-garamond">
          Ми команда волонтерів, що допомагає тваринкам знайди люблячий дім, а людям - вірного друга. Вибрати тваринку
          ти можеш самостійно, або ж за допомогою нашого опитувальника - просто заповни анкету і наш волонтер підбере її
          тобі!
        </p>

        <div className="mt-2 flex gap-6">
          <AppButton className="font-h4 min-w-[300px] px-8 py-4" asChild>
            <Link href={authorized ? '/quiz' : '/login?redirect=/quiz'}>Заповнити анкету</Link>
          </AppButton>

          <AppButton className="font-h4 min-w-[300px] px-8 py-4" variant="form-light" asChild>
            <Link href="/animals">Переглянути тваринок</Link>
          </AppButton>
        </div>
      </div>
    </div>
  );
};

export default Home;
