import clsx from 'clsx';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { PlayerSide } from '@/consts';
import { useIsLegacyMode } from '@/hooks/use-is-legacy-mode';
import { toogleLegacyPerk } from '@/store/appSlice';
import { RootState } from '@/store/store';
import { getPerkBelongingLocale } from '@/utils';

import { CustomComponentProps } from '@/types';

import './PerkHeader.scss';

type PlayerSideImages = {
  [PlayerSide.Survivor]: string;
  [PlayerSide.Killer]: string;
};

const playerSideImages: PlayerSideImages = {
  [PlayerSide.Survivor]: `./img/perks/${PlayerSide.Survivor}.png`,
  [PlayerSide.Killer]: `./img/perks/${PlayerSide.Killer}.png`,
};

type PlayerSideImgProps = CustomComponentProps & {
  playerSide: string;
};

function PlayerSideImg({
  className,
  playerSide,
}: PlayerSideImgProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <img
      className={clsx(className, 'perk-info__player-side-img')}
      src={playerSideImages[playerSide as keyof PlayerSideImages]}
      alt={t(playerSide, { ns: 'player-sides' })}
    />
  );
}

type PerkHeaderProps = CustomComponentProps & {
  id: string;
};

export default function PerkHeader({
  className,
  id,
}: PerkHeaderProps): JSX.Element {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const currentPerkId = useSelector(
    (state: RootState) => state.app.selectedPerkId,
  );

  const isLegacyMode = useIsLegacyMode(currentPerkId);

  const handleLegacySwitcherClick = (perkId: string) => {
    return (evt: MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();

      dispatch(toogleLegacyPerk(perkId));
    };
  };

  const perkId = id;
  const perkData = useSelector(
    (state: RootState) => state.perks.perksById[perkId],
  );

  const perkName = t(`${perkId}.name`, { ns: 'perks' });
  const perkPlayerSide = perkData.playerSide;
  const perkCharacter = getPerkBelongingLocale(perkData.character);
  const perkWiki = perkData.wiki;

  const perkHasLegacy = perkData.legacy !== null;
  const perkLegacy =
    perkData.legacy == null
      ? null
      : {
          name: perkHasLegacy
            ? t(`${perkId}.legacy.name`, { ns: 'perks' })
            : '',
          character: perkHasLegacy
            ? getPerkBelongingLocale(perkData.legacy.character)
            : '',
          wiki: perkHasLegacy ? perkData.legacy.wiki : '',
        };

  return (
    <div className={clsx(className, 'perk-header')}>
      <div className="perk-header__name">
        <a
          className="perk-header__wiki-link"
          href={!(perkHasLegacy && isLegacyMode) ? perkWiki : perkLegacy?.wiki}
          target="_blank"
          rel="noreferrer"
        >
          {!isLegacyMode ? perkName : perkLegacy?.name}
        </a>
      </div>
      <div className="perk-header__subtitle">
        {!isLegacyMode ? perkCharacter : perkLegacy?.character}
      </div>
      <div className="perk-header__player-side">
        {!perkHasLegacy ? (
          <PlayerSideImg playerSide={perkPlayerSide} />
        ) : (
          <button
            className="perk-header__legacy-switcher"
            type="button"
            onClick={handleLegacySwitcherClick(id)}
          >
            <PlayerSideImg playerSide={perkPlayerSide} />
          </button>
        )}
      </div>
    </div>
  );
}
