import { CustomComponentProps } from '../../types';
import './styles.scss';

type SorterProps = CustomComponentProps;

export default function Sorter({
  className = '',
}: SorterProps): React.JSX.Element {
  return <div className={`sorter ${className}`}>Сортировка</div>;
}
