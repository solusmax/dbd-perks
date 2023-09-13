import LanguageSwitcher from '../LanguageSwitcher';

type HeaderProps = {
  className: string,
};

export default function Header({ className }: HeaderProps): React.JSX.Element {
  return (
    <header className={`header ${className}`}>
      <LanguageSwitcher />
    </header>
  )
}
