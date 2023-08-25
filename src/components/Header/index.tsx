import LanguageSwitcher from '../LanguageSwitcher';
import Menu from '../Menu';

export default function Header(): React.JSX.Element {
  return (
    <>
      <LanguageSwitcher />
      <Menu />
    </>
  )
}
