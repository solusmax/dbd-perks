import clsx from 'clsx';

import { CustomComponentProps } from '@/types';

import './Header.scss';

type HeaderProps = CustomComponentProps;

export default function Header({
  className,
  children,
}: HeaderProps = {}): JSX.Element {
  return (
    <header className={clsx(className, 'header')}>
      <div className="header__inner">{children}</div>
    </header>
  );
}
