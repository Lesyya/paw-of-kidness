import React, { useMemo, useState } from 'react';

import RequestContext from './RequestContext';

import type { RequestDTO } from '@/types/request';
import type { RequestContextType } from './RequestContext';

export type RequestProviderProps = {
  children: React.ReactNode;
};

const RequestProvider: React.FC<RequestProviderProps> = ({ children }) => {
  const [request, setRequest] = useState<RequestDTO | null>(null);

  const providerValue = useMemo<RequestContextType>(
    () => ({
      request,
      addRequest: (newRequest: RequestDTO) => setRequest(newRequest),
      removeRequest: () => setRequest(null),
    }),
    [request],
  );

  return <RequestContext.Provider value={providerValue}>{children}</RequestContext.Provider>;
};

export default RequestProvider;
