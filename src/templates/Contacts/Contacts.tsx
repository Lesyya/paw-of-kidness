import React from 'react';
import Image from 'next/image';
import { mdiEmailOutline, mdiPhoneOutline, mdiMapMarker, mdiFacebook, mdiInstagram, mdiTwitter } from '@mdi/js';

import ContactsLink from './ContractsLink/ContactsLink';
import CatImage from '@/assets/contacts_cat.png';

const Contacts: React.FC = () => {
  return (
    <div className="flex w-full flex-1 flex-col items-center gap-4">
      <h1 className="font-h1 text-orange-900">Контакти</h1>
      <h2 className="font-h4 text-orange-700">Ви можете зв’язатися з нами за допомогою наступних ресурсів:</h2>

      <div className="flex flex-1 items-center justify-center gap-7">
        <Image src={CatImage} width={280} height={320} alt="Cat" />

        <div className="flex flex-col gap-6">
          <ContactsLink icon={mdiPhoneOutline} title="+38 098 752 1233" />
          <ContactsLink icon={mdiMapMarker} title="вулиця Свято-Покровська, 213, Гостомель, Київська область, 08290" />
          <ContactsLink icon={mdiEmailOutline} title="paw_kindness@gmail.com" url="mailto:paw_kindness@gmail.com" />
          <ContactsLink icon={mdiInstagram} title="Instagram" url="https://www.instagram.com/_lesia_koshel_" />
          <ContactsLink
            icon={mdiTwitter}
            title="Twitter"
            url="https://x.com/LesyaKoshel?t=zo_Z8QRFfQO672QkLAirhg&s=09"
          />
          <ContactsLink icon={mdiFacebook} title="Facebook" url="https://www.facebook.com/lesya.koshel.7" />
        </div>

        <div />
      </div>
    </div>
  );
};

export default Contacts;
