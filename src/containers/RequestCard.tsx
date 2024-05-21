import React from 'react';

import AnimalCard from '@/containers/AnimalCard';
import UserCard from '@/containers/UserCard';
import UserPreferenceCard from '@/containers/UserPreferenceCard';

import type { RequestDTO } from '@/types/request';

export type RequestCardProps = {
  request: RequestDTO;
  showFooter?: boolean;
  onUpdate?: () => void;
};

const RequestCard: React.FC<RequestCardProps> = ({
  request, //
  showFooter = true,
  onUpdate,
}) => {
  return (
    <div className="flex w-full items-center justify-center gap-6">
      {request.animal && <AnimalCard animal={request.animal} />}
      <UserCard request={request} showFooter={showFooter} animalId={request.animal?.id} onUpdate={onUpdate} />
      <UserPreferenceCard preference={request.preference} />
    </div>
  );
};

export default RequestCard;
