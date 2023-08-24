import { PageProps } from '../../types';
import { useEffect } from 'react'
import { setDocumentTitle } from '../../utils';

type TempPageProps = PageProps;

export default function TempRoute({ title }: TempPageProps): React.JSX.Element {
  useEffect(
    () => {
      setDocumentTitle(title)
    }, [title]
  )

  return (
    <>
      <div>
        Какой-то сервис: содержание
      </div>
    </>
  )
}
