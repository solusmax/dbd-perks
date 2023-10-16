import clsx from 'clsx';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Select from 'react-select';

import { getLanguages } from '@/model';
import {
  generateSelectOption,
  getCurrentLanguage,
  getDefaultLanguage,
  getNearestLanguage,
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
  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState<SelectOption>(
    generateSelectOption(getCurrentLanguage()),
  );

  const setNewLanguage = (language: SelectOption) => {
    setSelectedOption(language);
    setLanguage(language.value);
  };

  const handleSelectChange = (language: SelectOption | null) => {
    if (!language) {
      const defaultLanguage = getDefaultLanguage();

      setNewLanguage(generateSelectOption(defaultLanguage));
      return;
    }

    setNewLanguage(language);
  };

  const handleButtonClick = (direction: LanguageSwitcherDirection) => {
    return () => {
      const newLanguage = getNearestLanguage(direction);

      setNewLanguage(generateSelectOption(newLanguage));
    };
  };

  return (
    <div className={clsx(className, 'language-switcher')}>
      <button
        className="language-switcher__button language-switcher__button--previous"
        type="button"
        onClick={handleButtonClick('previous')}
      >
        <span className="visually-hidden">
          {t('previous-language', { ns: 'app' })}
        </span>
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
          return generateSelectOption(language);
        })}
      />

      <button
        className="language-switcher__button language-switcher__button--next"
        type="button"
        onClick={handleButtonClick('next')}
      >
        <span className="visually-hidden">
          {t('next-language', { ns: 'app' })}
        </span>
        <SvgIcon className="language-switcher__button-svg" icon="triangle" />
      </button>
    </div>
  );
}
