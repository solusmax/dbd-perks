import { useEffect } from 'react'
import { PageProps } from '../../types';
import { setDocumentTitle } from '../../utils';
import { useTranslation } from 'react-i18next';

type PerksProps = PageProps;

export default function Perks({ titleKey, titleNS }: PerksProps): React.JSX.Element {
  const { t } = useTranslation();

  useEffect(
    () => {
      setDocumentTitle(t(titleKey, {ns: titleNS}))
    }, [t, titleKey, titleNS]
  )

  return (
    <>
      <div>
        Навыки: содержание
      </div>
    </>
  )
}
