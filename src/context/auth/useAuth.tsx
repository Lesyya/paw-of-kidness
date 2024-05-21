import { useContext } from 'react';

import AuthContext from './AuthContext';

const useAuth = () => {
  const context = useContext(AuthContext);

  return {
    user: context?.user || null,
    isAdmin: !!context?.user?.isAdmin,
    loading: !!context?.loading,
    authorized: !!context?.user && !context?.loading,
    refetchUser: () => context?.refetch(),
  };
};

export default useAuth;
