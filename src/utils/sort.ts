import { SortDirection } from '@/consts';

import { PerkData } from '@/types';

export const comparePerksByName = (perkA: PerkData, perkB: PerkData) => {
  const perkNameA = perkA.id;
  const perkNameB = perkB.id;

  return perkNameA.localeCompare(perkNameB);
};

export const getPerksSortedByName = (
  perks: PerkData[],
  direction: SortDirection,
) => {
  const resultPerks = [...perks];

  resultPerks.sort(comparePerksByName);

  if (direction === SortDirection.Down) {
    return resultPerks;
  }

  return resultPerks.reverse();
};
