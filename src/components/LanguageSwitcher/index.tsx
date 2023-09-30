import './styles.scss';
import { CustomComponentProps } from '../../types';
import languagesJson from '../../data/languages.json';
import { useState } from 'react';
import { changeLanguage, getCurrentLanguage } from '../../utils';
import Select from 'react-select';

type LanguageSwitcherProps = CustomComponentProps;

type Language = {
  value: string;
  label: string;
};

const languages: Language[] = languagesJson;

const getDefaultLanguage = () => {
  return (
    languages.find((language) => language.value === getCurrentLanguage()) ??
    languages[0]
  );
};

export default function LanguageSwitcher({
  className = '',
}: LanguageSwitcherProps = {}): React.JSX.Element {
  const [selectedOption, setSelectedOption] = useState<Language>(
    getDefaultLanguage(),
  );

  const handleChange = (language: Language | null) => {
    if (!language) {
      setSelectedOption(getDefaultLanguage());
      changeLanguage(getDefaultLanguage().value);
      return;
    }

    setSelectedOption(language);
    changeLanguage(language.value);
  };

  return (
    <div className={`language-switcher ${className}`}>
      <Select
        className="language-switcher__select"
        classNamePrefix="language-switcher"
        isSearchable={false}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        defaultValue={selectedOption}
        onChange={(newValue) => handleChange(newValue)}
        options={languages}
      />
    </div>
  );
}
