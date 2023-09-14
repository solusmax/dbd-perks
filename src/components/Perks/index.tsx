import './styles.scss';
import { ComponentProps } from '../../types';
import Perk from '../Perk';

type PerksProps = ComponentProps;

export default function Perks({ className }: PerksProps): React.JSX.Element {
  return (
    <div className={`perks ${className}`}>
      Перки
      <Perk />
    </div>
  )
}
