import { useTranslation } from 'react-i18next';

import { CustomComponentProps } from '@/types';

import './Logo.scss';

type LogoProps = CustomComponentProps;

export default function Logo({ className = '' }: LogoProps = {}): JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={`logo ${className}`}>
      <img
        className="logo__img"
        src="img/logo.svg"
        alt={t('dbd-perks-logo', { ns: 'app' })}
      />
      <span className="logo__title">
        DBD Perks
        <span className="logo__beta">beta</span>
      </span>
    </div>
  );
}
