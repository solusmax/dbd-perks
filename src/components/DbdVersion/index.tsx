import './styles.scss';
import { useTranslation } from 'react-i18next';
import { ComponentProps } from '../../types';

type DbdVersionProps = ComponentProps & {
  dbdVersion: string
};

export default function DbdVersion({ className, dbdVersion }: DbdVersionProps): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={`dbd-version ${className}`} title={t('dbd-version')}>
      {dbdVersion}
    </div>
  )
}
