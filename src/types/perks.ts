import { Side } from '@/consts';

export type Sides = Side.Survivor | Side.Killer;

export type PerkData = {
  id: string;
  side: Sides;
  character: string;
  icon: string;
  wiki: string;
  legacy: {
    character: string;
    icon: string;
    wiki: string;
  } | null;
  localeNames?: string;
  localeDescription?: string;
  localeCharacterNames?: string;
};
