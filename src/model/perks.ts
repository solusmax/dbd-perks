import { t } from 'i18next';

import PerksJson from '@/data/perks.json';

import { PlayerSide } from '@/consts';
import { getLanguages } from '@/model';
import { getCharacterNameLocale, getClearedSearchText } from '@/utils';

import { PerkData } from '@/types';

export const getPerksData = (): PerkData[] => {
  const resultPerks: PerkData[] = PerksJson.map((perk) => {
    const currentPerk: PerkData = {
      ...perk,
      playerSide:
        perk['player-side'] === 'killer'
          ? PlayerSide.Killer
          : PlayerSide.Survivor,
      searchNames: '',
      searchDescription: '',
      searchCharacterNames: '',
    };

    getLanguages().forEach((language) => {
      const newNames = [
        t(`${perk.id}.name`, { ns: 'perks', lng: language }),
        ...t(`${perk.id}.alt-names`, {
          ns: 'perks',
          lng: language,
          joinArrays: ',',
        }).split(','),
      ];

      const newSearchDescription = t(`${perk.id}.searchDescription`, {
        ns: 'perks',
        lng: language,
      });

      const newCharacterNames = [
        getCharacterNameLocale({ character: perk.character, language }),
      ];

      currentPerk.searchNames += ` ${newNames.join(' ')}`;
      currentPerk.searchDescription += ` ${newSearchDescription}`;
      currentPerk.searchCharacterNames += ` ${newCharacterNames.join(' ')}`;

      if (perk.legacy !== null) {
        const newLegacyName = t(`${perk.id}.legacy.name`, {
          ns: 'perks',
          lng: language,
        });

        const newLegacyCharacterName = getCharacterNameLocale({
          character: perk.legacy.character,
          language,
        });

        currentPerk.searchNames += ` ${newLegacyName}`;
        currentPerk.searchCharacterNames += ` ${newLegacyCharacterName}`;
      }
    });

    currentPerk.searchNames = getClearedSearchText(currentPerk.searchNames);
    currentPerk.searchCharacterNames = getClearedSearchText(
      currentPerk.searchCharacterNames,
    );

    return currentPerk;
  });

  return resultPerks;
};
