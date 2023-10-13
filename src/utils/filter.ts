import MiniSearch from 'minisearch';

import {
  Side,
  searchByDescriptionOptions,
  searchByNamesOptions,
} from '@/consts';
import { getClearedSearchText, getUnitedPerks } from '@/utils';

import { FilterSettings, PerkData } from '@/types';

export const getFilteredPerks = (
  perks: PerkData[],
  { isKillerPerksShown, isSurvivorPerksShown, searchText }: FilterSettings,
) => {
  let resultPerks: PerkData[] = [];

  if (!isKillerPerksShown || !isSurvivorPerksShown) {
    resultPerks = perks.filter((perk) => {
      let isShown = true;

      if (!isKillerPerksShown && perk.side === Side.Killer) {
        isShown = false;
      }

      if (isShown && !isSurvivorPerksShown && perk.side === Side.Survivor) {
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

  const currentSearchText = getClearedSearchText(searchText);

  const miniSearchNames = new MiniSearch(searchByNamesOptions);

  miniSearchNames.addAll(resultPerks);

  const perksFilteredByNames = miniSearchNames
    .search(currentSearchText)
    .map((miniSearchPerk) => String(miniSearchPerk.id));

  const miniSearchDescription = new MiniSearch(searchByDescriptionOptions);

  miniSearchDescription.addAll(resultPerks);

  const perksFilteredByDescription = miniSearchDescription
    .search(currentSearchText)
    .filter((miniSearchPerk) => {
      if (typeof miniSearchPerk.localeDescription !== 'string') {
        return;
      }

      return miniSearchPerk.localeDescription.includes(currentSearchText);
    })
    .map((miniSearchPerk) => String(miniSearchPerk.id));

  resultPerks = getUnitedPerks(
    perks,
    perksFilteredByNames,
    perksFilteredByDescription,
  );

  return resultPerks;
};
