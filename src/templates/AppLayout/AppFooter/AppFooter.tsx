import React from 'react';
import Link from 'next/link';
import Icon from '@mdi/react';
import { mdiFacebook, mdiInstagram, mdiTwitter } from '@mdi/js';

import AppButton from '@/components/AppButton';
import { cn } from '@/utils';

export type AppFooterProps = {
  transparent?: boolean;
};

const AppFooter: React.FC<AppFooterProps> = ({ transparent }) => {
  const className: string = cn(
    'flex flex-1 max-w-[1440px] justify-between py-6 items-center', //
    transparent ? 'text-white' : 'text-dark-orange',
  );

  return (
    <div className={className}>
      <div className="flex flex-1 gap-4">
        <a href="https://www.facebook.com/lesya.koshel.7" aria-label="Facebook">
          <Icon path={mdiFacebook} size="24px" />
        </a>
        <a href="https://www.instagram.com/_lesia_koshel_" aria-label="Instagram">
          <Icon path={mdiInstagram} size="24px" />
        </a>
        <a href="https://x.com/LesyaKoshel?t=zo_Z8QRFfQO672QkLAirhg&s=09" aria-label="Twitter">
          <Icon path={mdiTwitter} size="24px" />
        </a>
      </div>

      <p>© 2024 Лапа Добра</p>

      <div className="flex flex-1 justify-end">
        <AppButton
          className="min-w-[200px] px-4 py-2" //
          variant={transparent ? 'form-light' : 'form-dark'}
          asChild
        >
          <Link href="https://www.facebook.com/lesya.koshel.7">Підтримка</Link>
        </AppButton>
      </div>
    </div>
  );
};

export default AppFooter;
