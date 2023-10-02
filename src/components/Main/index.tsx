import { RootState } from '../../store/store';
import { CustomComponentProps, PerkData } from '../../types';
import Filter from '../Filter';
import Perks from '../Perks';
import Sorter from '../Sorter';
import './styles.scss';
import { useSelector } from 'react-redux';

type MainProps = CustomComponentProps;

export default function Main({
  className = '',
}: MainProps = {}): React.JSX.Element {
  const perks: PerkData[] = useSelector((state: RootState) => state.perks);

  return (
    <main className={`main ${className}`}>
      <div className="main__inner">
        <Filter />
        <Sorter />
        <Perks perks={perks} />
      </div>
    </main>
  );
}
