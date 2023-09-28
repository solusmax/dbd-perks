import './styles.scss'
import PerksJson from './../../data/perks.json'
import { CustomComponentProps, PerkData } from '../../types'
import Filter from '../Filter'
import Sorter from '../Sorter'
import Perks from '../Perks'

const perks: PerkData[] = PerksJson;

type MainProps = CustomComponentProps;

export default function Main({ className = '' }: MainProps = {}): React.JSX.Element {
  return (
    <main className={`main ${className}`}>
      <div className="main__inner">
        <Filter />
        <Sorter />
        <Perks perks={perks} />
      </div>
    </main>
  )
}
