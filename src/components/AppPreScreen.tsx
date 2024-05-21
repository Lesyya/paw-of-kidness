import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import LogoIconImage from '@/assets/logo_icon.png';

type AlphaPreScreenProps = {
  visible: boolean;
};

const AppPreScreen: React.FC<AlphaPreScreenProps> = ({ visible }) => {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    if (visible) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 1000);
    }
  }, [visible]);

  if (!isVisible) return null;

  return (
    <div
      className={`fixed inset-0 z-20 flex items-center justify-center bg-orange-100 transition-opacity duration-1000 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="flex size-[150px] items-center justify-center rounded-full bg-orange-900 p-8 text-black shadow-2xl">
        <Image src={LogoIconImage} alt="Logo Лапа Добра" width={120} height={120} />
      </div>
    </div>
  );
};

export default AppPreScreen;
