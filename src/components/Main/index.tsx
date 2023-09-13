import { useTranslation } from 'react-i18next';

type MainProps = {
  className: string,
};

export default function Main({ className }: MainProps): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <main className={`main ${className}`}>
      <div>
        {t('something.example', { ns: 'perks' })}
      </div>
    </main>
  )
}
