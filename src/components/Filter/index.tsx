import './styles.scss';
import { CustomComponentProps } from '../../types';

type FilterProps = CustomComponentProps;

export default function Filter({
  className = '',
}: FilterProps): React.JSX.Element {
  return <div className={`filter ${className}`}>Фильтр</div>;
}
