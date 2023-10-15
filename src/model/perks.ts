import { t } from 'i18next';

import PerksJson from '@/data/perks.json';

import { PlayerSide } from '@/consts';
import { getLanguages } from '@/model';
import {
  addClearedTerm,
  generateSearchTerms,
  getCharacterNameLocale,
  getI18ArrayElements,
} from '@/utils';

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
      const searchNames = generateSearchTerms(
        t(`${perk.id}.name`, { ns: 'perks', lng: language }),
        ...getI18ArrayElements(`${perk.id}.alt-names`, {
          ns: 'perks',
          lng: language,
        }),
      );

      const searchCharacterNames = generateSearchTerms(
        getCharacterNameLocale({
          character: perk.character,
          language,
        }),
        ...getI18ArrayElements(`${perk.character}.alt-names`, {
          ns: 'characters',
          lng: language,
        }),
      );

      const searchDescription = t(`${perk.id}.searchDescription`, {
        ns: 'perks',
        lng: language,
      });

      currentPerk.searchNames = [currentPerk.searchNames, searchNames].join(
        ' ',
      );
      currentPerk.searchCharacterNames = [
        currentPerk.searchCharacterNames,
        searchCharacterNames,
      ].join(' ');
      currentPerk.searchDescription = [
        currentPerk.searchDescription,
        searchDescription,
      ].join(' ');

      if (perk.legacy !== null) {
        const legacyNames = addClearedTerm(
          t(`${perk.id}.legacy.name`, {
            ns: 'perks',
            lng: language,
          }),
        );

        const legacyCharacterNames = generateSearchTerms(
          getCharacterNameLocale({
            character: perk.legacy.character,
            language,
          }),
          ...getI18ArrayElements(`${perk.legacy.character}.alt-names`, {
            ns: 'characters',
            lng: language,
          }),
        );

        currentPerk.searchNames = [currentPerk.searchNames, legacyNames].join(
          ' ',
        );
        currentPerk.searchCharacterNames = [
          currentPerk.searchCharacterNames,
          legacyCharacterNames,
        ].join(' ');
      }
    });

    return currentPerk;
  });

  return resultPerks;
};
