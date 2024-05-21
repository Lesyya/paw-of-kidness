import { useContext } from 'react';

import RequestContext from './RequestContext';

import type { RequestDTO } from '@/types/request';

const useRequest = () => {
  const context = useContext(RequestContext);

  return {
    request: context?.request || null,
    addRequest: (request: RequestDTO) => context?.addRequest(request),
    removeRequest: () => context?.removeRequest(),
  };
};

export default useRequest;
