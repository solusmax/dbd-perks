import clsx from 'clsx';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { PlayerSide } from '@/consts';
import {
  toggleKillerPerksShown,
  toggleSurvivorPerksShown,
} from '@/store/appSlice';
import { RootState } from '@/store/store';

import { CustomComponentProps } from '@/types';

import SvgIcon from '@/components/SvgIcon/SvgIcon';

import './PlayerSideSwitchers.scss';

type PlayerSideSwitchersProps = CustomComponentProps;

export default function PlayerSideSwitchers({
  className,
}: PlayerSideSwitchersProps): JSX.Element {
  const isKillerSelected = useSelector(
    (state: RootState) => state.app.killerPerksShown,
  );
  const isSurvivorSelected = useSelector(
    (state: RootState) => state.app.survivorPerksShown,
  );

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const handleButtonClick = (playerSide: PlayerSide) => {
    return (evt: MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();

      switch (playerSide) {
        case PlayerSide.Killer:
          dispatch(toggleKillerPerksShown());
          break;
        case PlayerSide.Survivor:
          dispatch(toggleSurvivorPerksShown());
          break;
      }
    };
  };

  return (
    <div className={clsx(className, 'player-side-switchers')}>
      <button
        className={clsx(
          className,
          'player-side-switchers__button',
          'player-side-switchers__button--killer',
          isKillerSelected && 'player-side-switchers__button--selected',
          'tooltip',
        )}
        type="button"
        onClick={handleButtonClick(PlayerSide.Killer)}
        data-tooltip-content={t('player-side-switcher-killer-button', {
          ns: 'app',
        })}
      >
        <img
          className="player-side-switchers__img"
          src={`./img/perks/${PlayerSide.Killer}_80.png`}
          alt={t(PlayerSide.Killer, { ns: 'player-sides' })}
        />
        <SvgIcon
          className="player-side-switchers__img-background"
          icon="killer-background"
        />
      </button>

      <button
        className={clsx(
          className,
          'player-side-switchers__button',
          'player-side-switchers__button--survivor',
          isSurvivorSelected && 'player-side-switchers__button--selected',
          'tooltip',
        )}
        type="button"
        onClick={handleButtonClick(PlayerSide.Survivor)}
        data-tooltip-content={t('player-side-switcher-survivor-button', {
          ns: 'app',
        })}
      >
        <img
          className="player-side-switchers__img"
          src={`./img/perks/${PlayerSide.Survivor}_80.png`}
          alt={t(PlayerSide.Survivor, { ns: 'player-sides' })}
        />
      </button>
    </div>
  );
}
