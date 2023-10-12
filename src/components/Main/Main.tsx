import i18n from 'i18next';
import { useDispatch, useSelector } from 'react-redux';

import { getPerksData } from '@/model/data';
import { setPerks } from '@/store/perksSlice';
import { RootState } from '@/store/store';
import { getFilteredPerks, getPerksSortedByName } from '@/utils';

import { CustomComponentProps } from '@/types';

import Filter from '@/components/Filter/Filter';
import Perks from '@/components/Perks/Perks';
import PerksCounter from '@/components/PerksCounter/PerksCounter';
import Searching from '@/components/Searching/Searching';
import Sorter from '@/components/Sorter/Sorter';

import './Main.scss';

type MainProps = CustomComponentProps;

export default function Main({ className = '' }: MainProps = {}): JSX.Element {
  const dispatch = useDispatch();

  i18n.on('loaded', () => {
    dispatch(setPerks(getPerksData()));
  });

  const isSearching = useSelector((state: RootState) => state.app.isSearching);

  const perks = useSelector((state: RootState) => state.perks.perks);

  const searchText = useSelector((state: RootState) => state.app.searchText);

  const selectedDirection = useSelector(
    (state: RootState) => state.app.sortDirection,
  );
  const isKillerPerksShown = useSelector(
    (state: RootState) => state.app.killerPerksShown,
  );
  const isSurvivorPerksShown = useSelector(
    (state: RootState) => state.app.survivorPerksShown,
  );

  const filteredPerks = getFilteredPerks(perks, {
    searchText,
    isKillerPerksShown,
    isSurvivorPerksShown,
  });

  const outputPerks = getPerksSortedByName(filteredPerks, selectedDirection);

  return (
    <main className={`main ${className}`}>
      <div className="main__inner">
        <div className="main__filter-sorter-wrapper">
          <Filter className="main__filter" />
          <Sorter className="main__sorter" />
          {isSearching ? (
            <Searching className="main__searching" />
          ) : (
            <PerksCounter
              className="main__perks-counter"
              perksCount={outputPerks.length}
            />
          )}
        </div>
        <div className="main__perks-wrapper">
          <Perks perks={outputPerks} />
        </div>
      </div>
    </main>
  );
}
