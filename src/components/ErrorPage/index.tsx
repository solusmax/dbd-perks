import { PageProps } from '../../types';
import { useEffect } from 'react'
import { setDocumentTitle } from '../../utils';
import { useRouteError } from 'react-router-dom'
import { useTranslation } from 'react-i18next';

type ErrorPageProps = PageProps;

export default function ErrorPage({ titleKey, titleNS }: ErrorPageProps): React.JSX.Element {
  const { t } = useTranslation();

  useEffect(
    () => {
      setDocumentTitle(t(titleKey, {ns: titleNS}))
    }, [t, titleKey, titleNS]
  )

  const error:unknown = useRouteError();
  console.log(error);

  return (
    <>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </>
  )
}
