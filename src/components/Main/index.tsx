import './styles.scss';
import { ComponentProps } from '../../types';
import Filter from '../Filter';
import Sorter from '../Sorter';
import Perks from '../Perks';

type MainProps = ComponentProps;

export default function Main({ className }: MainProps = {}): React.JSX.Element {
  return (
    <main className={`main ${className}`}>
      <div>
        <Filter />
        <Sorter />
        <Perks />
      </div>
    </main>
  )
}
