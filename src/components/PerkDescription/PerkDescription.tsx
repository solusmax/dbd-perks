import { CustomComponentProps } from '@/types';

import './PerkDescription.scss';

type PerkDescriptionProps = CustomComponentProps & {
  description: string;
};

export default function PerkDescription({
  className = '',
  description,
}: PerkDescriptionProps): JSX.Element {
  return (
    <div
      className={`perk-description ${className}`}
      dangerouslySetInnerHTML={{ __html: description }}
    />
  );
}
