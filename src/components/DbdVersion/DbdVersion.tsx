import { useTranslation } from 'react-i18next';

import { CustomComponentProps } from '@/types';

import './DbdVersion.scss';

type DbdVersionProps = CustomComponentProps & {
  dbdVersion: string;
};

export default function DbdVersion({
  className = '',
  dbdVersion,
}: DbdVersionProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <div
        className={`tooltip dbd-version ${className}`}
        data-tooltip-content={t('dbd-version-tooltip', { ns: 'app' })}
      >
        {dbdVersion}
      </div>
    </>
  );
}
