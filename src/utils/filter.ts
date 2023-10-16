import { PlayerSide } from '@/consts';
import { getFilteredBySearchTextPerks } from '@/utils';

import { FilterSettings, PerkData } from '@/types';

export const getFilteredPerks = (
  perks: PerkData[],
  {
    searchText,
    isSearchByDescription,
    isKillerPerksShown,
    isSurvivorPerksShown,
  }: FilterSettings,
) => {
  let resultPerks: PerkData[] = [];

  if (!isKillerPerksShown || !isSurvivorPerksShown) {
    resultPerks = perks.filter((perk) => {
      let isShown = true;

      if (!isKillerPerksShown && perk.playerSide === PlayerSide.Killer) {
        isShown = false;
      }

      if (
        isShown &&
        !isSurvivorPerksShown &&
        perk.playerSide === PlayerSide.Survivor
      ) {
        isShown = false;
      }

      return isShown;
    });
  } else {
    resultPerks = [...perks];
  }

  if (searchText.trim() === '') {
    return resultPerks;
  }

  resultPerks = getFilteredBySearchTextPerks(
    resultPerks,
    searchText,
    isSearchByDescription,
  );

  return resultPerks;
};
