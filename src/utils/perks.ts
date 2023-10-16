import { t } from 'i18next';
import union from 'just-union';

import { Character } from '@/consts';

import { PerkData } from '@/types';

export const getPerksByIds = (allPerks: PerkData[], perkIds: string[]) => {
  return allPerks.filter((perk) => {
    return perkIds.includes(perk.id);
  });
};

export const getUnitedPerks = (
  allPerks: PerkData[],
  perkIdsA: string[],
  perkIdsB: string[],
) => {
  const resultPerksIds = union(perkIdsA, perkIdsB);

  return getPerksByIds(allPerks, resultPerksIds);
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

  return t(`${character}.name`, tOptions);
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
