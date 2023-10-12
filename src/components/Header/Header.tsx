import { CustomComponentProps } from '@/types';

import './Header.scss';

type HeaderProps = CustomComponentProps;

export default function Header({
  className = '',
  children = null,
}: HeaderProps = {}): JSX.Element {
  return (
    <header className={`header ${className}`}>
      <div className="header__inner">{children}</div>
    </header>
  );
}
