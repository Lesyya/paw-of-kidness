import { createContext } from 'react';

import type { UserDTO } from '@/types/user';

export interface AuthContextType {
  loading: boolean;
  user: UserDTO | null;
  refetch: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export default AuthContext;
