import './styles.scss';
import { ComponentProps } from '../../types';

type LogoProps = ComponentProps;

export default function Logo({ className }: LogoProps): React.JSX.Element {
  return (
    <div className={`logo ${className}`}>
      <img className="logo__img" src="img/logo.svg" alt="Логотип DBD Perks." />
      <span className="logo__title">DBD Perks</span>
    </div>
  )
}
