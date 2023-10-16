import clsx from 'clsx';
import i18n from 'i18next';
import { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { getPerksData } from '@/model';
import { setPerks } from '@/store/perksSlice';
import { RootState } from '@/store/store';
import { getFilteredPerks, getPerksSortedByName } from '@/utils';

import { CustomComponentProps } from '@/types';

import Filter from '@/components/Filter/Filter';
import Perks from '@/components/Perks/Perks';
import PerksCounter from '@/components/PerksCounter/PerksCounter';
import Sorter from '@/components/Sorter/Sorter';

import './Main.scss';

type MainProps = CustomComponentProps;

export default function Main({ className }: MainProps = {}): JSX.Element {
  const dispatch = useDispatch();

  i18n.on('loaded', () => {
    dispatch(setPerks(getPerksData()));
  });

  const perks = useSelector((state: RootState) => state.perks.perks);

  const searchText = useSelector((state: RootState) => state.app.searchText);
  const isSearchByDescription = useSelector(
    (state: RootState) => state.app.isSearchByDescription,
  );
  const isKillerPerksShown = useSelector(
    (state: RootState) => state.app.killerPerksShown,
  );
  const isSurvivorPerksShown = useSelector(
    (state: RootState) => state.app.survivorPerksShown,
  );
  const selectedDirection = useSelector(
    (state: RootState) => state.app.sortDirection,
  );

  const filteredPerks = getFilteredPerks(perks, {
    searchText,
    isSearchByDescription,
    isKillerPerksShown,
    isSurvivorPerksShown,
  });

  const outputPerks = useMemo(
    () => getPerksSortedByName(filteredPerks, selectedDirection),
    [filteredPerks, selectedDirection],
  );

  return (
    <main className={clsx(className, 'main')}>
      <div className="main__inner">
        <div className="main__filter-sorter-wrapper">
          <Filter className="main__filter" />
          <Sorter className="main__sorter" />
          <PerksCounter
            className="main__perks-counter"
            perksCount={outputPerks.length}
          />
        </div>
        <div className="main__perks-wrapper">
          <Perks perks={outputPerks} />
        </div>
      </div>
    </main>
  );
}
