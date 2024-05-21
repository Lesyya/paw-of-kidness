import React from 'react';
import { mdiLoading } from '@mdi/js';
import Icon from '@mdi/react';

export type AppLoaderProps = {
  visible?: boolean;
  className?: string;
};

const AppLoader: React.FC<AppLoaderProps> = ({ visible, className }) => {
  if (!visible) return null;

  return <Icon path={mdiLoading} className={`size-6 animate-spin ${className}`} />;
};

export default AppLoader;
