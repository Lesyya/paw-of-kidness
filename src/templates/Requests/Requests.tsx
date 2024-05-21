import React, { useEffect } from 'react';

import RequestCard from '@/containers/RequestCard';
import api from '@/api';
import useRequest from '@/context/request/useRequest';

const Requests: React.FC = () => {
  const { removeRequest } = useRequest();

  const { data: requests, refetch } = api.request.getRequests.useQuery(undefined, {
    refetchOnWindowFocus: false,
  });

  useEffect(removeRequest, []);

  return (
    <div className="flex w-full flex-1 flex-col items-center gap-4">
      <h1 className="font-h1 text-orange-900">У Вас {requests?.length ?? 0} нових заявок</h1>

      <div className="flex w-full flex-col gap-4">
        {requests?.map(request => <RequestCard key={request.id} request={request} onUpdate={refetch} />)}
      </div>
    </div>
  );
};

export default Requests;
