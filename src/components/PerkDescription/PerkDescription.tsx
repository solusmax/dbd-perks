import clsx from 'clsx';
import { useTranslation } from 'react-i18next';

import { CustomComponentProps } from '@/types';

import './PerkDescription.scss';

type PerkDescriptionProps = CustomComponentProps & {
  id: string;
};

export default function PerkDescription({
  className,
  id,
}: PerkDescriptionProps): JSX.Element {
  const { t } = useTranslation();

  const perkId = id;
  const perkDescription = t(`${perkId}.description`, { ns: 'perks' });

  return (
    <div
      className={clsx(className, 'perk-description')}
      dangerouslySetInnerHTML={{ __html: perkDescription }}
    />
  );
}
