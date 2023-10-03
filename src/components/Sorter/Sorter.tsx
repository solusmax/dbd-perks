import { MouseEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { SortDirection } from '@/consts/sorter';
import { setSortDirection } from '@/store/appSlice';
import { RootState } from '@/store/store';

import { CustomComponentProps } from '@/types';

import SvgIcon from '@/components/SvgIcon/SvgIcon';

import './styles.scss';

const SORTER_SELECTED_CLASS = 'sorter__svg--selected';

type SorterProps = CustomComponentProps;

export default function Sorter({
  className = '',
}: SorterProps): React.JSX.Element {
  const selectedDirection = useSelector(
    (state: RootState) => state.app.sortDirection,
  );
  const dispatch = useDispatch();

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
    <div className={`sorter ${className}`}>
      <button
        className="sorter__button"
        type="button"
        onClick={handleButtonClick}
      >
        <div className="sorter__svg-wrapper">
          <SvgIcon
            icon="arrow"
            className={`sorter__svg ${
              selectedDirection === SortDirection.Up
                ? SORTER_SELECTED_CLASS
                : ''
            }`}
          />
          <SvgIcon
            icon="arrow"
            className={`sorter__svg sorter__svg--down ${
              selectedDirection === SortDirection.Down
                ? SORTER_SELECTED_CLASS
                : ''
            }`}
          />
        </div>
      </button>
    </div>
  );
}
