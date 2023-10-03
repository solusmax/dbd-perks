import { Side, SortDirection } from '@/consts';

import { FilterSettings, PerkData, SortDirections } from '@/types';

export const comparePerksByName = (perkA: PerkData, perkB: PerkData) => {
  const perkNameA = perkA.id;
  const perkNameB = perkB.id;

  return perkNameA.localeCompare(perkNameB);
};

export const getPerksSortedByName = (
  perks: PerkData[],
  direction: SortDirections,
) => {
  const resultPerks = [...perks];

  resultPerks.sort(comparePerksByName);

  if (direction === SortDirection.Down) {
    return resultPerks;
  }

  return resultPerks.reverse();
};

export const getPerksFilteredBy = (
  perks: PerkData[],
  filterSettings: FilterSettings,
) => {
  let resultPerks = [...perks];

  if (!filterSettings.isKillerPerksShown) {
    resultPerks = resultPerks.filter((perk) => {
      return perk.side !== Side.Killer;
    });
  }

  if (!filterSettings.isSurvivorPerksShown) {
    resultPerks = resultPerks.filter((perk) => {
      return perk.side !== Side.Survivor;
    });
  }

  return resultPerks;
};
