import MiniSearch from 'minisearch';
import removeAccents from 'remove-accents';

import { searchByDescriptionOptions, searchByNamesOptions } from '@/consts';
import { getPerksByIds, getUnitedPerks } from '@/utils';

import { PerkData } from '@/types';

export const getClearedSearchText = (text: string | undefined) => {
  if (text == null) {
    return '';
  }

  return text.trim().replace(/[\s]+/g, ' ');
};

export const getClearedTerm = (text: string | undefined) => {
  if (text == null) {
    return '';
  }

  let resultText = text;

  resultText = removeAccents(resultText);

  resultText = resultText.replace(/'/g, '');

  return resultText;
};

export const addClearedTerm = (term: string) => {
  const clearedTerm = getClearedTerm(term);

  return term === clearedTerm ? term : `${term} ${clearedTerm}`;
};

export const generateSearchTerms = (...terms: string[]) => {
  return terms
    .map((term) => {
      return addClearedTerm(term);
    })
    .join(' ');
};

export const getFilteredBySearchTextPerks = (
  perks: PerkData[],
  searchText: string,
  isSearchByDescription: boolean,
) => {
  let resultPerks: PerkData[] = [];

  const currentSearchText = getClearedSearchText(searchText);

  const miniSearchNames = new MiniSearch(searchByNamesOptions);

  miniSearchNames.addAll(perks);

  const filteredByNamesPerkIds = miniSearchNames
    .search(currentSearchText)
    .map((miniSearchPerk) => String(miniSearchPerk.id));

  if (isSearchByDescription) {
    const miniSearchDescription = new MiniSearch(searchByDescriptionOptions);

    miniSearchDescription.addAll(perks);

    const filteredByDescriptionPerkIds = miniSearchDescription
      .search(currentSearchText)
      .filter((miniSearchPerk) => {
        if (typeof miniSearchPerk.searchDescription !== 'string') {
          return;
        }

        return miniSearchPerk.searchDescription.includes(currentSearchText);
      })
      .map((miniSearchPerk) => String(miniSearchPerk.id));

    resultPerks = getUnitedPerks(
      perks,
      filteredByNamesPerkIds,
      filteredByDescriptionPerkIds,
    );
  } else {
    resultPerks = getPerksByIds(perks, filteredByNamesPerkIds);
  }

  return resultPerks;
};
