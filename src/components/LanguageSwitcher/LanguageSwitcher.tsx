import clsx from 'clsx';
import { useState } from 'react';
import Select from 'react-select';

import { getLanguages } from '@/model';
import {
  getCurrentLanguage,
  getDefaultLanguage,
  getNearestLanguage,
  getSelectOption,
  setLanguage,
} from '@/utils';

import {
  CustomComponentProps,
  LanguageSwitcherDirection,
  SelectOption,
} from '@/types';

import SvgIcon from '@/components/SvgIcon/SvgIcon';

import './LanguageSwitcher.scss';

type LanguageSwitcherProps = CustomComponentProps;

const languages = getLanguages();

export default function LanguageSwitcher({
  className,
}: LanguageSwitcherProps = {}): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<SelectOption>(
    getSelectOption(getCurrentLanguage()),
  );

  const setNewLanguage = (language: SelectOption) => {
    setSelectedOption(language);
    setLanguage(language.value);
  };

  const handleSelectChange = (language: SelectOption | null) => {
    if (!language) {
      const defaultLanguage = getDefaultLanguage();

      setNewLanguage(getSelectOption(defaultLanguage));
      return;
    }

    setNewLanguage(language);
  };

  const handleButtonClick = (direction: LanguageSwitcherDirection) => {
    return () => {
      const newLanguage = getNearestLanguage(direction);

      setNewLanguage(getSelectOption(newLanguage));
    };
  };

  return (
    <div className={clsx(className, 'language-switcher')}>
      <button
        className="language-switcher__button language-switcher__button--previous"
        type="button"
        onClick={handleButtonClick('previous')}
      >
        <SvgIcon className="language-switcher__button-svg" icon="triangle" />
      </button>

      <Select
        className="language-switcher__select"
        classNamePrefix="language-switcher"
        menuPlacement="top"
        menuPortalTarget={document.body}
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
        }}
        isSearchable={false}
        value={selectedOption}
        onChange={(newValue) => handleSelectChange(newValue)}
        options={languages.map((language) => {
          return getSelectOption(language);
        })}
      />

      <button
        className="language-switcher__button language-switcher__button--next"
        type="button"
        onClick={handleButtonClick('next')}
      >
        <SvgIcon className="language-switcher__button-svg" icon="triangle" />
      </button>
    </div>
  );
}
