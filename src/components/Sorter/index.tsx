import './styles.scss'
import { CustomComponentProps } from '../../types'

type SorterProps = CustomComponentProps;

export default function Sorter({ className = '' }: SorterProps): React.JSX.Element {
  return (
    <div className={`sorter ${className}`}>
      Сортировка
    </div>
  )
}
