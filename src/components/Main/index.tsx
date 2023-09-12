import { useTranslation } from 'react-i18next';

export default function Main(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <div>
        {t('something.example', { ns: 'perks' })}
      </div>
    </>
  )
}
