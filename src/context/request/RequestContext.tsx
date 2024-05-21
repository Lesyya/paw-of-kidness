import { createContext } from 'react';

import type { RequestDTO } from '@/types/request';

export interface RequestContextType {
  request: RequestDTO | null;
  addRequest: (request: RequestDTO) => void;
  removeRequest: () => void;
}

const RequestContext = createContext<RequestContextType | null>(null);

export default RequestContext;
