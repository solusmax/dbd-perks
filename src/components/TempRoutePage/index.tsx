import { PageProps } from '../../types';
import { useEffect } from 'react'
import { setDocumentTitle } from '../../utils';
import { useTranslation } from 'react-i18next';

type TempRoutePageProps = PageProps;

export default function TempRoutePage({ titleKey, titleNS }: TempRoutePageProps): React.JSX.Element {
  const { t } = useTranslation();

  useEffect(
    () => {
      setDocumentTitle(t(titleKey, {ns: titleNS}))
    }, [t, titleKey, titleNS]
  )

  return (
    <>
      <div>
        Какой-то сервис: содержание
      </div>
    </>
  )
}
