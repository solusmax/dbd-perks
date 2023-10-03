import { ChangeEvent, MouseEvent, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { Side } from '@/consts';

import { CustomComponentProps } from '@/types';

import SvgIcon from '@/components/SvgIcon/SvgIcon';

import './styles.scss';

type FilterProps = CustomComponentProps;
type Sides = Side.Survivor | Side.Killer;

export default function Filter({
  className = '',
}: FilterProps): React.JSX.Element {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const [searchValue, setSearchValue] = useState<string>('');
  const [isSurvivorSelected, setIsSurvivorSelecter] = useState<boolean>(true);
  const [isKillerSelected, setIsKillerSelected] = useState<boolean>(true);
  const { t } = useTranslation();

  const changeSearchValue = (value: string) => {
    setSearchValue(value);
  };

  const focusSearch = () => {
    searchInputRef.current?.focus();
  };

  const handleSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    changeSearchValue(evt.target.value);
  };

  const handleResetButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    changeSearchValue('');
    focusSearch();
  };

  const handleSideSwitcherClick = (side: Sides) => {
    return (evt: MouseEvent<HTMLButtonElement>) => {
      evt.preventDefault();

      switch (side) {
        case Side.Killer:
          setIsKillerSelected(!isKillerSelected);
          break;
        case Side.Survivor:
          setIsSurvivorSelecter(!isSurvivorSelected);
          break;
      }
    };
  };

  return (
    <div className={`filter ${className}`}>
      <input
        className="filter__search"
        ref={searchInputRef}
        name="perks-filter"
        type="search"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder={t('search-placeholder', { ns: 'app' })}
      />
      <div className="filter__search-buttons">
        {searchValue !== '' && (
          <button
            className="filter__search-reset"
            type="button"
            onClick={handleResetButtonClick}
          >
            <SvgIcon className="filter__search-reset-svg" icon="cross" />
          </button>
        )}

        <button
          className={`filter__side-switcher filter__side-switcher--killer ${
            isKillerSelected ? 'filter__side-switcher--selected' : ''
          }`}
          type="button"
          onClick={handleSideSwitcherClick(Side.Killer)}
        >
          <img
            className="filter__side-switcher-img"
            src={`./img/perks/${Side.Killer}.png`}
            alt={t(Side.Killer, { ns: 'sides' })}
          />
        </button>

        <button
          className={`filter__side-switcher filter__side-switcher--survivor ${
            isSurvivorSelected ? 'filter__side-switcher--selected' : ''
          }`}
          type="button"
          onClick={handleSideSwitcherClick(Side.Survivor)}
        >
          <img
            className="filter__side-switcher-img"
            src={`./img/perks/${Side.Survivor}.png`}
            alt={t(Side.Survivor, { ns: 'sides' })}
          />
        </button>
      </div>
    </div>
  );
}
