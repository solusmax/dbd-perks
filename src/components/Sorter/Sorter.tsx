import clsx from 'clsx';
import { MouseEvent } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { SortDirection } from '@/consts/sorter';
import { setSortDirection } from '@/store/appSlice';
import { RootState } from '@/store/store';

import { CustomComponentProps } from '@/types';

import SvgIcon from '@/components/SvgIcon/SvgIcon';

import './Sorter.scss';

type SorterProps = CustomComponentProps;

export default function Sorter({ className }: SorterProps): JSX.Element {
  const selectedDirection = useSelector(
    (state: RootState) => state.app.sortDirection,
  );
  const dispatch = useDispatch();

  const { t } = useTranslation();

  const handleButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    dispatch(
      setSortDirection(
        selectedDirection === SortDirection.Down
          ? SortDirection.Up
          : SortDirection.Down,
      ),
    );
  };

  return (
    <div className={clsx(className, 'sorter')}>
      <button
        className="sorter__button tooltip"
        type="button"
        onClick={handleButtonClick}
        data-tooltip-content={t('sorter-button', {
          ns: 'app',
        })}
      >
        <div className="sorter__svg-wrapper">
          <SvgIcon
            icon="arrow"
            className={clsx(
              'sorter__svg',
              selectedDirection === SortDirection.Up && 'sorter__svg--selected',
            )}
          />
          <SvgIcon
            icon="arrow"
            className={clsx(
              'sorter__svg',
              'sorter__svg--down',
              selectedDirection === SortDirection.Down &&
                'sorter__svg--selected',
            )}
          />
        </div>
      </button>
    </div>
  );
}
