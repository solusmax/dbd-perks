import { useEffect } from 'react'
import { PageProps } from '../../types';
import { setDocumentTitle } from '../../utils';

type PerksProps = PageProps;

export default function Perks({ title }: PerksProps): React.JSX.Element {
  useEffect(
    () => {
      setDocumentTitle(title);
    }, [title]
  )

  return (
    <>
      <div>
        Навыки: содержание
      </div>
    </>
  )
}
