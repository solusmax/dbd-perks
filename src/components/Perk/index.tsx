import './styles.scss';
import { ComponentProps } from '../../types';
import { useTranslation } from 'react-i18next';

type PerkProps = ComponentProps;

export default function Perk({ className }: PerkProps): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={`perk ${className}`}>
      {t('something.example', { ns: 'perks' })}
    </div>
  )
}
