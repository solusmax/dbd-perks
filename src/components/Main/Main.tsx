import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';

import { CustomComponentProps, PerkData } from '@/types';

import Filter from '@/components/Filter/Filter';
import Perks from '@/components/Perks/Perks';
import Sorter from '@/components/Sorter/Sorter';

import './styles.scss';

type MainProps = CustomComponentProps;

export default function Main({
  className = '',
}: MainProps = {}): React.JSX.Element {
  const perks: PerkData[] = useSelector((state: RootState) => state.perks);

  return (
    <main className={`main ${className}`}>
      <div className="main__inner">
        <div className="main__filter-sorter-wrapper">
          <Filter className="main__filter" />
          <Sorter className="main__sorter" />
        </div>
        <Perks perks={perks} />
      </div>
    </main>
  );
}
