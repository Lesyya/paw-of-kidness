import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Icon from '@mdi/react';
import { mdiAccount } from '@mdi/js';

import AppButton from '@/components/AppButton';
import { cn } from '@/utils';

export type HeaderLinkProps = {
  text: string;
  url: string;
  accountIcon?: boolean;
};

const HeaderLink: React.FC<HeaderLinkProps> = ({
  text, //
  url,
  accountIcon,
}) => {
  const router = useRouter();

  const className: string = cn(
    'gap-5 px-4 py-2 font-h3', //
    router.pathname === url && 'underline',
  );

  return (
    <AppButton className={className} variant="link" asChild>
      <Link href={url}>
        {accountIcon && <Icon path={mdiAccount} size="40px" />}
        {text}
      </Link>
    </AppButton>
  );
};

export default HeaderLink;
