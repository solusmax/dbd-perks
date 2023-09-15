import './styles.scss';
import { ComponentProps } from '../../types';

type SorterProps = ComponentProps;

export default function Sorter({ className = '' }: SorterProps): React.JSX.Element {
  return (
    <div className={`sorter ${className}`}>
      Сортировка
    </div>
  )
}
