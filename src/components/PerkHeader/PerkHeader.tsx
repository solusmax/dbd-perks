import clsx from 'clsx';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Side } from '@/consts';
import { useIsLegacyMode } from '@/hooks/use-is-legacy-mode';
import { toogleLegacyPerk } from '@/store/appSlice';
import { RootState } from '@/store/store';
import { getPerkBelongingLocale } from '@/utils';

import { CustomComponentProps } from '@/types';

import './PerkHeader.scss';

type SideImages = {
  [Side.Survivor]: string;
  [Side.Killer]: string;
};

const sideImages: SideImages = {
  [Side.Survivor]: `./img/perks/${Side.Survivor}.png`,
  [Side.Killer]: `./img/perks/${Side.Killer}.png`,
};

type SideImgProps = CustomComponentProps & {
  side: string;
};

function SideImg({ className, side }: SideImgProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <img
      className={clsx(className, 'perk-info__side-img')}
      src={sideImages[side as keyof SideImages]}
      alt={t(side, { ns: 'sides' })}
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
  const currentPerkId = useSelector(
    (state: RootState) => state.app.selectedPerkId,
  );
  const isLegacyMode = useIsLegacyMode(currentPerkId);

  const { t } = useTranslation();

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
  const perkSide = perkData.side;
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
      <div className="perk-header__side">
        {!perkHasLegacy ? (
          <SideImg side={perkSide} />
        ) : (
          <button
            className="perk-header__legacy-switcher"
            type="button"
            onClick={handleLegacySwitcherClick(id)}
          >
            <SideImg side={perkSide} />
          </button>
        )}
      </div>
    </div>
  );
}
