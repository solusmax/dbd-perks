import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Side } from '@/consts';
import { useIsLegacyMode } from '@/hooks/use-is-legacy-mode';
import { toogleLegacyPerk } from '@/store/appSlice';
import { RootState } from '@/store/store';

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

function SideImg({ className = '', side }: SideImgProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <img
      className={`perk-info__side-img ${className}`}
      src={sideImages[side as keyof SideImages]}
      alt={t(side, { ns: 'sides' })}
    />
  );
}

type PerkHeaderProps = CustomComponentProps & {
  id: string;
  name: string;
  side: string;
  character: string;
  wiki: string;
  hasLegacy: boolean;
  legacy: {
    name: string;
    character: string;
    wiki: string;
  };
};

export default function PerkHeader({
  className = '',
  id,
  name,
  side,
  character,
  wiki,
  hasLegacy,
  legacy,
}: PerkHeaderProps): JSX.Element {
  const dispatch = useDispatch();
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

  return (
    <div className={`perk-header ${className}`}>
      <div className="perk-header__name">
        <a
          className="perk-header__wiki-link"
          href={!(hasLegacy && isLegacyMode) ? wiki : legacy.wiki}
          target="_blank"
          rel="noreferrer"
        >
          {!isLegacyMode ? name : legacy.name}
        </a>
      </div>
      <div className="perk-header__subtitle">
        {!isLegacyMode ? character : legacy.character}
      </div>
      <div className="perk-header__side">
        {!hasLegacy ? (
          <SideImg side={side} />
        ) : (
          <button
            className="perk-header__legacy-switcher"
            type="button"
            onClick={handleLegacySwitcherClick(id)}
          >
            <SideImg side={side} />
          </button>
        )}
      </div>
    </div>
  );
}
