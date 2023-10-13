import { useWindowSize } from '@uidotdev/usehooks';
import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { isMobileBreakpoint } from '@/utils';

import { CustomComponentProps } from '@/types';

import './PerksCounter.scss';

type PerksCounterProps = CustomComponentProps & {
  perksCount: number;
};

export default function PerksCounter({
  className,
  perksCount,
}: PerksCounterProps): JSX.Element {
  const { t } = useTranslation();
  const { width: windowWidth } = useWindowSize();

  return (
    <div
      className={clsx(className, 'perks-counter', 'tooltip')}
      data-tooltip-hidden={!isMobileBreakpoint(windowWidth)}
      data-tooltip-content={t('perks-counter-tooltip', { ns: 'app' })}
    >
      {isMobileBreakpoint(windowWidth)
        ? `(${perksCount})`
        : `${t('perks-counter-label', { ns: 'app', count: perksCount })}`}
    </div>
  );
}
