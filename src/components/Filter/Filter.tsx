import { useDebounce } from '@uidotdev/usehooks';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Side } from '@/consts';
import {
  setIsSeaching,
  setSearchText,
  toggleKillerPerksShown,
  toggleSurvivorPerksShown,
} from '@/store/appSlice';
import { RootState } from '@/store/store';

import { CustomComponentProps, Sides } from '@/types';

import SvgIcon from '@/components/SvgIcon/SvgIcon';

import './Filter.scss';

const SEARCH_DELAY = 750;

type FilterProps = CustomComponentProps;

export default function Filter({ className = '' }: FilterProps): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, SEARCH_DELAY);
  const globalSearchValue = useSelector(
    (state: RootState) => state.app.searchText,
  );

  const isKillerSelected = useSelector(
    (state: RootState) => state.app.killerPerksShown,
  );
  const isSurvivorSelected = useSelector(
    (state: RootState) => state.app.survivorPerksShown,
  );
  const dispatch = useDispatch();

  const searchInputRef = useRef<HTMLInputElement>(null);

  const { t } = useTranslation();

  useEffect(() => {
    dispatch(setIsSeaching(searchValue !== globalSearchValue));
  }, [dispatch, searchValue, globalSearchValue]);

  useEffect(() => {
    if (globalSearchValue !== debouncedSearchValue) {
      dispatch(setSearchText(debouncedSearchValue));
    }
  }, [dispatch, globalSearchValue, debouncedSearchValue]);

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
          dispatch(toggleKillerPerksShown());
          break;
        case Side.Survivor:
          dispatch(toggleSurvivorPerksShown());
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
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder={t('search-placeholder', { ns: 'app' })}
        autoFocus
        autoCapitalize="off"
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

        <div className="filter__side-switchers">
          <button
            className={`tooltip filter__side-switcher filter__side-switcher--killer ${
              isKillerSelected ? 'filter__side-switcher--selected' : ''
            }`}
            type="button"
            onClick={handleSideSwitcherClick(Side.Killer)}
            data-tooltip-content={t('side-switcher-killer-button', {
              ns: 'app',
            })}
          >
            <img
              className="filter__side-switcher-img"
              src={`./img/perks/${Side.Killer}_80.png`}
              alt={t(Side.Killer, { ns: 'sides' })}
            />
            <SvgIcon
              className="filter__side-switcher-img-background"
              icon="killer-background"
            />
          </button>

          <button
            className={`tooltip filter__side-switcher filter__side-switcher--survivor ${
              isSurvivorSelected ? 'filter__side-switcher--selected' : ''
            }`}
            type="button"
            onClick={handleSideSwitcherClick(Side.Survivor)}
            data-tooltip-content={t('side-switcher-survovor-button', {
              ns: 'app',
            })}
          >
            <img
              className="filter__side-switcher-img"
              src={`./img/perks/${Side.Survivor}_80.png`}
              alt={t(Side.Survivor, { ns: 'sides' })}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
