import './styles.scss';
import { ComponentProps } from '../../types';
import dbdData from '../../data/dbd.json';
import Logo from '../Logo';
import DbdVersion from '../DbdVersion';
import LanguageSwitcher from '../LanguageSwitcher';

type HeaderProps = ComponentProps;

export default function Header({ className }: HeaderProps = {}): React.JSX.Element {
  return (
    <header className={`header ${className}`}>
      <div className="header__inner">
        <Logo />
        <DbdVersion className="header__dbd-version" dbdVersion={dbdData.version} />
        <LanguageSwitcher className="header__language-switcher" />
      </div>
    </header>
  )
}
