import clsx from 'clsx';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useIsLegacyMode } from '@/hooks/use-is-legacy-mode';
import { setSelectedPerkId } from '@/store/appSlice';
import { RootState } from '@/store/store';
import { getPerkBelongingLocale } from '@/utils';

import { CustomComponentProps, PerkData } from '@/types';

import './Perk.scss';

type PerkProps = CustomComponentProps & PerkData;

export default function Perk({
  className,
  id,
  side,
  character,
  icon,
  wiki,
  legacy,
}: PerkProps): JSX.Element {
  const isInfoOpen = useSelector(
    (state: RootState) => id !== null && state.app.selectedPerkId === id,
  );
  const dispatch = useDispatch();
  const isLegacyMode = useIsLegacyMode(id);
  const { t } = useTranslation();
  const hasLegacy = legacy !== null;

  const handleButtonClick = (newSelecterPerkID: string) => {
    return (evt: MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();
      dispatch(setSelectedPerkId(newSelecterPerkID));
    };
  };

  const perkId = id;
  const perkName = t(`${id}.name`, { ns: 'perks' });
  const perkSide = side;
  const perkCharacter = getPerkBelongingLocale(character);
  const perkWiki = wiki;
  const perkDescription = t(`${id}.description`, { ns: 'perks' });
  const perkHasLegacy = hasLegacy ? 'true' : 'false';
  const perkLegacy = {
    name: hasLegacy ? t(`${id}.legacy.name`, { ns: 'perks' }) : '',
    character: hasLegacy ? getPerkBelongingLocale(legacy.character) : '',
    wiki: hasLegacy ? legacy.wiki : '',
  };
  const perkIcon = !(hasLegacy && isLegacyMode)
    ? `./img/perks/${side}/${icon}`
    : `./img/perks/${side}/legacy/${legacy.icon}`;
  const perkIconAltText = !(hasLegacy && isLegacyMode)
    ? t(`${id}.name`, { ns: 'perks' })
    : t(`${id}.legacy.name`, { ns: 'perks' });

  return (
    <div className={clsx(className, 'perk')}>
      <button
        className={clsx('perk__button', isInfoOpen && 'perk__button--selected')}
        onClick={handleButtonClick(id)}
        data-perk-id={perkId}
        data-perk-name={perkName}
        data-perk-side={perkSide}
        data-perk-character={perkCharacter}
        data-perk-description={perkDescription}
        data-perk-wiki={perkWiki}
        data-perk-has-legacy={perkHasLegacy}
        data-perk-legacy-name={perkLegacy.name}
        data-perk-legacy-character={perkLegacy.character}
        data-perk-legacy-wiki={perkLegacy.wiki}
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
