import { PageProps } from '../../types';
import { useEffect } from 'react'
import { setDocumentTitle } from '../../utils';
import { useRouteError } from 'react-router-dom'

type ErrorPageProps = PageProps;

export default function ErrorPage({ title }: ErrorPageProps): React.JSX.Element {
  useEffect(() => {
    setDocumentTitle(title);
  }, [title])

  const error:unknown = useRouteError();
  console.log(error);

  return (
    <>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
    </>
  )
}
