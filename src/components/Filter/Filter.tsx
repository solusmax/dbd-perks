import { useDebounce } from '@uidotdev/usehooks';
import clsx from 'clsx';
import { ChangeEvent, MouseEvent, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { SEARCH_DELAY } from '@/consts';
import { setIsSeaching, setSearchText } from '@/store/appSlice';
import { RootState } from '@/store/store';

import { CustomComponentProps } from '@/types';

import PlayerSideSwitchers from '@/components/PlayerSideSwitchers/PlayerSideSwitchers';
import SvgIcon from '@/components/SvgIcon/SvgIcon';

import './Filter.scss';

type FilterProps = CustomComponentProps;

export default function Filter({ className }: FilterProps): JSX.Element {
  const [searchValue, setSearchValue] = useState<string>('');
  const debouncedSearchValue = useDebounce(searchValue, SEARCH_DELAY);
  const globalSearchValue = useSelector(
    (state: RootState) => state.app.searchText,
  );

  const dispatch = useDispatch();
  const { t } = useTranslation();

  const searchInputRef = useRef<HTMLInputElement>(null);

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

  return (
    <div className={clsx(className, 'filter')}>
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

        <PlayerSideSwitchers className="filter__player-side-switchers" />
      </div>
    </div>
  );
}
