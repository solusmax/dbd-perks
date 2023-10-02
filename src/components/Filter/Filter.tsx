import { CustomComponentProps } from '../../types';
import './styles.scss';

type FilterProps = CustomComponentProps;

export default function Filter({
  className = '',
}: FilterProps): React.JSX.Element {
  return <div className={`filter ${className}`}>Фильтр</div>;
}
