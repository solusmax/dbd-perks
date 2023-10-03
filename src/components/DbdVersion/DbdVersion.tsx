import { useTranslation } from 'react-i18next';
import { Tooltip } from 'react-tooltip';

import { CustomComponentProps } from '@/types';

import './styles.scss';

type DbdVersionProps = CustomComponentProps & {
  dbdVersion: string;
};

export default function DbdVersion({
  className = '',
  dbdVersion,
}: DbdVersionProps): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <div id="dbd-version" className={`dbd-version ${className}`}>
        {dbdVersion}
      </div>
      <Tooltip
        className="dbd-version__tooltip"
        anchorSelect="#dbd-version"
        place="bottom"
        closeOnEsc
      >
        {t('dbd-version-tooltip')}
      </Tooltip>
    </>
  );
}
