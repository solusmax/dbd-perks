import './styles.scss';
import { useTranslation } from 'react-i18next';
import { ComponentProps } from '../../types';
import { Tooltip } from 'react-tooltip'

type DbdVersionProps = ComponentProps & {
  dbdVersion: string
};

export default function DbdVersion({ className, dbdVersion }: DbdVersionProps): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <div id='dbd-version' className={`dbd-version ${className}`}>
        {dbdVersion}
      </div>
      <Tooltip className='dbd-version__tooltip' anchorSelect="#dbd-version" place="bottom" closeOnEsc>
        {t('dbd-version-tooltip')}
      </Tooltip>
    </>
  )
}
