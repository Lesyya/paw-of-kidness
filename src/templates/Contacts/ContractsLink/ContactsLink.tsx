import React from 'react';
import Icon from '@mdi/react';
import Link from 'next/link';

export type ContactsLinkProp = {
  icon: string;
  title: string;
  url?: string;
};

const ContactsLink: React.FC<ContactsLinkProp> = ({
  icon, //
  title,
  url,
}) => {
  return (
    <div className="flex items-center gap-8">
      <Icon className="shrink-0 text-orange-900" path={icon} size="30px" />

      {url ? (
        <Link className="font-h3 text-orange-900 underline" href={url}>
          {title}
        </Link>
      ) : (
        <p className="font-h3 text-orange-900">{title}</p>
      )}
    </div>
  );
};

export default ContactsLink;
