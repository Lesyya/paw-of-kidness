import type { AnimalPreferenceDTO } from '@/types/animal';
import type { UserInfoDTO } from '@/types/user';

const scoreMultiplier = {
  ageMultiplier: 0.094,
  petMultiplier: 0.132,
  placeMultiplier: 0.113,
  lifestyleMultiplier: 0.17,
  timeMultiplier: 0.189,
  childrenMultiplier: 0.151,
  experienceMultiplier: 0.151,
} as const;

const calculateScore = (animalPreference: AnimalPreferenceDTO, userInfo: UserInfoDTO): number => {
  let score = 0;

  const criterias = Object.keys(userInfo) as Array<keyof UserInfoDTO>;
  criterias.forEach(key => {
    if (key === 'id') return;

    const importance: number = animalPreference[`${key}Importance`];
    const multiplier: number = scoreMultiplier[`${key}Multiplier`];
    const isMatch: boolean = userInfo[key] === animalPreference[`${key}Pref`];

    let scoreToAdd = 0;
    if (importance === 1) scoreToAdd = 5;
    else if (importance === 3) scoreToAdd = isMatch ? 5 : 3;
    else if (importance === 5) scoreToAdd = isMatch ? 5 : 1;

    score += scoreToAdd * multiplier;
  });

  // return (score / ((criterias.length - 1) * 5)) * 1000;
  return score;
};

export default calculateScore;
