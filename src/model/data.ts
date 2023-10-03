import PerksJson from '@/data/perks.json';

import { PerkData } from '@/types';

export const getPerksData = (): PerkData[] => {
  return PerksJson;
};
