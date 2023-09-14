import './styles.scss';
import { ComponentProps } from '../../types';

type FilterProps = ComponentProps;

export default function Filter({ className }: FilterProps): React.JSX.Element {
  return (
    <div className={`filter ${className}`}>
      Фильтр
    </div>
  )
}
