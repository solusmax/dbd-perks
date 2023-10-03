import { CustomComponentProps } from '@/types';

import './styles.scss';

type LogoProps = CustomComponentProps;

export default function Logo({
  className = '',
}: LogoProps = {}): React.JSX.Element {
  return (
    <div className={`logo ${className}`}>
      <img className="logo__img" src="img/logo.svg" alt="Логотип DBD Perks." />
      <span className="logo__title">DBD Perks</span>
    </div>
  );
}
