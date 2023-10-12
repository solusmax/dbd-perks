import { t } from 'i18next';
import union from 'just-union';
import MiniSearch from 'minisearch';

import {
  Character,
  Side,
  SortDirection,
  searchByDescriptionOptions,
  searchByNamesOptions,
} from '@/consts';
import { getClearedSearchText } from '@/utils';

import { FilterSettings, PerkData, SortDirections } from '@/types';

export const comparePerksByName = (perkA: PerkData, perkB: PerkData) => {
  const perkNameA = perkA.id;
  const perkNameB = perkB.id;

  return perkNameA.localeCompare(perkNameB);
};

export const getPerkIndexById = (perks: PerkData[], id: string) =>
  perks.findIndex((perk) => perk.id === id);

export const getUnitedPerks = (
  allPerks: PerkData[],
  perksIdsA: string[],
  perksIdsB: string[],
) => {
  const resultPerks: PerkData[] = [];

  const resultPerksIds = union(perksIdsA, perksIdsB);

  resultPerksIds.forEach((perkId) => {
    resultPerks.push(allPerks[getPerkIndexById(allPerks, perkId)]);
  });

  return resultPerks;
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

  return getUnitedPerks(
    perks,
    perksFilteredByNames,
    perksFilteredByDescription,
  );
};

type GetCharacterNameLocale = {
  character: string;
  language?: string;
  isGenitive?: boolean;
};

export const getCharacterNameLocale = ({
  character,
  language,
  isGenitive = false,
}: GetCharacterNameLocale) => {
  const tOptions: Record<string, string | null> = {
    ns: 'characters',
    context: character !== Character.General && isGenitive ? 'genitive' : null,
  };

  if (language != null) {
    tOptions.lng = language;
  }

  return t(character, tOptions);
};

export const getPerkBelongingLocale = (character: string) => {
  const tOptions: Record<string, string | null> = {
    ns: 'app',
    character:
      character === Character.General
        ? null
        : getCharacterNameLocale({ character, isGenitive: true }),
  };

  return t(
    character === Character.General
      ? 'perk-belonging-general'
      : 'perk-belonging-character',
    tOptions,
  );
};
