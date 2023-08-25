import Perks from '../routes/Perks';
import TempRoute from '../routes/TempRoute';

type Service = {
  title: string,
  route: string,
  routeElement: React.JSX.Element,
}

export const services: Service[] = [
  {
    title: 'Perks',
    route: 'perks',
    get routeElement() {
      return <Perks title={this.title} />
    }
  },
  {
    title: 'TempRoute',
    route: 'temproute',
    get routeElement() {
      return <TempRoute title={this.title} />
    }
  },
]
