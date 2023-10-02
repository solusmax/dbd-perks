import dbdData from '../../data/dbd.json';
import { CustomComponentProps } from '../../types';
import DbdVersion from '../DbdVersion/DbdVersion';
import LanguageSwitcher from '../LanguageSwitcher/LanguageSwitcher';
import Logo from '../Logo/Logo';
import './styles.scss';

type HeaderProps = CustomComponentProps;

export default function Header({
  className = '',
}: HeaderProps = {}): React.JSX.Element {
  return (
    <header className={`header ${className}`}>
      <div className="header__inner">
        <Logo />
        <DbdVersion
          className="header__dbd-version"
          dbdVersion={dbdData.version}
        />
        <LanguageSwitcher className="header__language-switcher" />
      </div>
    </header>
  );
}
