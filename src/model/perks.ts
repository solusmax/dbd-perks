import { convert } from 'html-to-text';
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
      localeNames: '',
      localeDescription: '',
      localeCharacterNames: '',
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

      const newDescriptions = convert(
        t(`${perk.id}.description`, {
          ns: 'perks',
          lng: language,
        }),
        {
          wordwrap: null,
        },
      )
        .trim()
        .split(/[\s\p{P}]+/u)
        .filter((el) => el !== '');

      const newCharacterNames = [
        getCharacterNameLocale({ character: perk.character, language }),
      ];

      currentPerk.localeNames += ` ${newNames.join(' ')}`;
      currentPerk.localeDescription += ` ${newDescriptions.join(' ')}`;
      currentPerk.localeCharacterNames += ` ${newCharacterNames.join(' ')}`;

      if (perk.legacy !== null) {
        const newLegacyName = t(`${perk.id}.legacy.name`, {
          ns: 'perks',
          lng: language,
        });

        const newLegacyCharacterName = getCharacterNameLocale({
          character: perk.legacy.character,
          language,
        });

        currentPerk.localeNames += ` ${newLegacyName}`;
        currentPerk.localeCharacterNames += ` ${newLegacyCharacterName}`;
      }
    });

    currentPerk.localeNames = getClearedSearchText(currentPerk.localeNames);
    currentPerk.localeDescription = getClearedSearchText(
      currentPerk.localeDescription,
    );
    currentPerk.localeCharacterNames = getClearedSearchText(
      currentPerk.localeCharacterNames,
    );

    return currentPerk;
  });

  return resultPerks;
};
