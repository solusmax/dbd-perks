import clsx from 'clsx';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useIsLegacyMode } from '@/hooks/use-is-legacy-mode';
import { setSelectedPerkId } from '@/store/appSlice';
import { RootState } from '@/store/store';

import { CustomComponentProps } from '@/types';

import './Perk.scss';

type PerkProps = CustomComponentProps & {
  id: string;
};

export default function Perk({ className, id }: PerkProps): JSX.Element {
  const isInfoOpen = useSelector(
    (state: RootState) => id !== null && state.app.selectedPerkId === id,
  );
  const dispatch = useDispatch();
  const isLegacyMode = useIsLegacyMode(id);
  const { t } = useTranslation();

  const handleButtonClick = (newSelecterPerkID: string) => {
    return (evt: MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();
      dispatch(setSelectedPerkId(newSelecterPerkID));
    };
  };

  const perkId = id;
  const perkData = useSelector(
    (state: RootState) => state.perks.perksById[perkId],
  );
  const perkHasLegacy = perkData.legacy !== null;
  const perkIcon = !(perkHasLegacy && isLegacyMode)
    ? `./img/perks/${perkData.side}/${perkData.icon}`
    : `./img/perks/${perkData.side}/legacy/${perkData.legacy?.icon}`;
  const perkIconAltText = !(perkHasLegacy && isLegacyMode)
    ? t(`${id}.name`, { ns: 'perks' })
    : t(`${id}.legacy.name`, { ns: 'perks' });

  return (
    <div className={clsx(className, 'perk')}>
      <button
        className={clsx('perk__button', isInfoOpen && 'perk__button--selected')}
        onClick={handleButtonClick(perkId)}
        data-perk-id={perkId}
      >
        <img
          id={`perk-img-${id}`}
          className="perk__img"
          src={perkIcon}
          alt={perkIconAltText}
        />
        <div className="perk__selection perk__selection--tl" />
        <div className="perk__selection perk__selection--tr" />
        <div className="perk__selection perk__selection--bl" />
        <div className="perk__selection perk__selection--br" />
      </button>
      <div className="perk__overlay" />
    </div>
  );
}
