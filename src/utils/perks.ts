import { t } from 'i18next';
import union from 'just-union';

import { Character } from '@/consts';

import { PerkData } from '@/types';

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
