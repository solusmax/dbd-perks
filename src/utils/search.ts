import MiniSearch from 'minisearch';

import { searchByDescriptionOptions, searchByNamesOptions } from '@/consts';
import { getUnitedPerks } from '@/utils';

import { PerkData } from '@/types';

export const getClearedSearchText = (text: string | undefined) => {
  if (text == null) {
    return '';
  }

  return text.trim().replace(/[\s]+/g, ' ').replace(/ё/g, 'е');
};

export const getFilteredBySearchTextPerks = (
  perks: PerkData[],
  searchText: string,
) => {
  const currentSearchText = getClearedSearchText(searchText);

  const miniSearchNames = new MiniSearch(searchByNamesOptions);

  miniSearchNames.addAll(perks);

  const filteredByNamesPerkIds = miniSearchNames
    .search(currentSearchText)
    .map((miniSearchPerk) => String(miniSearchPerk.id));

  const miniSearchDescription = new MiniSearch(searchByDescriptionOptions);

  miniSearchDescription.addAll(perks);

  const filteredByDescriptionPerkIds = miniSearchDescription
    .search(currentSearchText)
    .filter((miniSearchPerk) => {
      if (typeof miniSearchPerk.localeDescription !== 'string') {
        return;
      }

      return miniSearchPerk.localeDescription.includes(currentSearchText);
    })
    .map((miniSearchPerk) => String(miniSearchPerk.id));

  return getUnitedPerks(
    perks,
    filteredByNamesPerkIds,
    filteredByDescriptionPerkIds,
  );
};
