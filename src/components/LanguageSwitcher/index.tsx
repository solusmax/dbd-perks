import { ComponentProps } from '../../types';
import languages from '../../data/languages.json'
import { changeLanguage } from '../../utils';

type LanguageSwitcherProps = ComponentProps;

export default function LanguageSwitcher({ className }: LanguageSwitcherProps): React.JSX.Element {
  return (
    <div className={`language-switcher ${className}`}>
      {languages.map((language) => {
        return <button key={language} onClick={() => changeLanguage(language)}>{language.toUpperCase()}</button>
      })}
    </div>
  )
}
