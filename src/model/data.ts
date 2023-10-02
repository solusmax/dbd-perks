import { PerkData } from '../types';
import PerksJson from './../data/perks.json';

export const getPerksData = (): PerkData[] => {
  return PerksJson;
};
