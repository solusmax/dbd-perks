import languages from '../../data/languages.json'
import { changeLanguage } from '../../utils';

export default function LanguageSwitcher(): React.JSX.Element {
  return (
    <>
      {languages.map((language) => {
        return <button key={language} onClick={() => changeLanguage(language)}>{language.toUpperCase()}</button>
      })}
    </>
  )
}
