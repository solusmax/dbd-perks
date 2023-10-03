import { MouseEvent, useState } from 'react';

import { CustomComponentProps } from '@/types';

import SvgIcon from '@/components/SvgIcon/SvgIcon';

import './styles.scss';

const SORTER_SELECTED_CLASS = 'sorter__svg--selected';

enum SortDirection {
  Up = 'up',
  Down = 'down',
}

type SortDirections = SortDirection.Down | SortDirection.Up;

type SorterProps = CustomComponentProps;

export default function Sorter({
  className = '',
}: SorterProps): React.JSX.Element {
  const [selectedDirection, setSelectedDirection] = useState<SortDirections>(
    SortDirection.Down,
  );

  const handleButtonClick = (evt: MouseEvent<HTMLButtonElement>) => {
    evt.preventDefault();

    setSelectedDirection(
      selectedDirection === SortDirection.Down
        ? SortDirection.Up
        : SortDirection.Down,
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
