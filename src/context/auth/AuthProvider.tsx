import React, { useEffect, useMemo } from 'react';

import AuthContext from './AuthContext';
import api from '@/api';

import type { AuthContextType } from './AuthContext';

export type AuthProviderProps = {
  children: React.ReactNode;
};

const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data, isFetching, refetch } = api.auth.getMe.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  const providerValue = useMemo<AuthContextType>(
    () => ({
      refetch,
      user: data?.user || null,
      loading: isFetching,
    }),
    [data, isFetching, refetch],
  );

  useEffect(() => {
    refetch();
  }, []);

  return <AuthContext.Provider value={providerValue}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
