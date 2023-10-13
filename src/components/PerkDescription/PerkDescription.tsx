import clsx from 'clsx';

import { CustomComponentProps } from '@/types';

import './PerkDescription.scss';

type PerkDescriptionProps = CustomComponentProps & {
  description: string;
};

export default function PerkDescription({
  className,
  description,
}: PerkDescriptionProps): JSX.Element {
  return (
    <div
      className={clsx(className, 'perk-description')}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
}
