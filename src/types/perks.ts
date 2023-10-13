import { PlayerSide } from '@/consts';

export type PerkData = {
  id: string;
  playerSide: PlayerSide;
  character: string;
  icon: string;
  wiki: string;
  legacy: {
    character: string;
    icon: string;
    wiki: string;
  } | null;
  searchNames?: string;
  searchDescription?: string;
  searchCharacterNames?: string;
};
