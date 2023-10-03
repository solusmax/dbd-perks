import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { useIsLegacyMode } from '@/hooks/use-is-legacy-mode';
import { setSelectedPerkId } from '@/store/appSlice';
import { RootState } from '@/store/store';

import { CustomComponentProps, PerkData } from '@/types';

import './styles.scss';

type PerkProps = CustomComponentProps & PerkData;

export default function Perk({
  className = '',
  id,
  side,
  character,
  icon,
  wiki,
  legacy,
}: PerkProps): React.JSX.Element {
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

  return (
    <div className={`perk ${className}`}>
      <button
        className={`perk__button ${isInfoOpen ? 'perk__button--selected' : ''}`}
        onClick={handleButtonClick(id)}
        data-perk-id={id}
        data-perk-name={t(`${id}.name`, { ns: 'perks' })}
        data-perk-name-en={t(`${id}.name`, { ns: 'perks', lng: 'en' })}
        data-perk-side={side}
        data-perk-character={t(character, { ns: 'characters' })}
        data-perk-description={t(`${id}.description`, { ns: 'perks' })}
        data-perk-wiki={wiki}
        data-perk-has-legacy={hasLegacy ? 'true' : 'false'}
        data-perk-legacy-name={
          hasLegacy ? t(`${id}.legacy.name`, { ns: 'perks' }) : ''
        }
        data-perk-legacy-name-en={
          hasLegacy ? t(`${id}.legacy.name`, { ns: 'perks', lng: 'en' }) : ''
        }
        data-perk-legacy-wiki={hasLegacy ? legacy.wiki : ''}
        data-perk-legacy-character={
          hasLegacy ? t(legacy.character, { ns: 'characters' }) : ''
        }
      >
        <img
          id={`perk-img-${id}`}
          className="perk__img"
          src={
            !(hasLegacy && isLegacyMode)
              ? `./img/perks/${side}/${icon}`
              : `./img/perks/${side}/legacy/${legacy.icon}`
          }
          alt={
            !(hasLegacy && isLegacyMode)
              ? t(`${id}.name`, { ns: 'perks' })
              : t(`${id}.legacy.name`, { ns: 'perks' })
          }
        />
      </button>
      <div className="perk__overlay" />
    </div>
  );
}
