import clsx from 'clsx';
import {
  ChangeEvent,
  MouseEvent,
  useDeferredValue,
  useEffect,
  useRef,
  useState,
} from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';

import { setSearchText } from '@/store/appSlice';

import { CustomComponentProps } from '@/types';

import PlayerSideSwitchers from '@/components/PlayerSideSwitchers/PlayerSideSwitchers';
import SvgIcon from '@/components/SvgIcon/SvgIcon';

import './Filter.scss';

type FilterProps = CustomComponentProps;

export default function Filter({ className }: FilterProps): JSX.Element {
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const [searchValue, setSearchValue] = useState<string>('');
  const deferredSearchValue = useDeferredValue(searchValue);

  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    dispatch(setSearchText(deferredSearchValue));
  }, [dispatch, deferredSearchValue]);

  const focusSearch = () => {
    searchInputRef.current?.focus();
  };

  const handleSearchChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setSearchValue(evt.target.value);
  };

  const handleResetButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    setSearchValue('');
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
            <span className="visually-hidden">
              {t('reset-search', { ns: 'app' })}
            </span>
            <SvgIcon className="filter__search-reset-svg" icon="cross" />
          </button>
        )}

        <PlayerSideSwitchers className="filter__player-side-switchers" />
      </div>
    </div>
  );
}
