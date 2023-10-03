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
};

export type PerkLocale = {
  name: string;
  altNames: string[] | null;
  description: string;
  legacy: {
    name: string;
  } | null;
};
