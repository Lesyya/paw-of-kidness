import React from 'react';

export type PreferenceCardProps = {
  title: string;
  values: Array<string | number>;
};

/* eslint-disable react/no-array-index-key */
const PreferenceCard: React.FC<PreferenceCardProps> = ({ title, values }) => {
  return (
    <div className="w-[200px] overflow-hidden whitespace-nowrap rounded-lg bg-orange-100 py-2">
      <p className="border-b border-black text-center">{title}</p>
      <ul className="flex flex-col">
        {values.map((value, index) => (
          <li key={index} className="border-b border-black p-1">
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PreferenceCard;
