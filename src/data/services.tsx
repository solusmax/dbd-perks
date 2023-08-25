import Perks from '../routes/Perks';
import TempRoute from '../routes/TempRoute';

type Service = {
  localeNS: string,
  localeKey: string,
  route: string,
  routeElement: React.JSX.Element,
}

export const services: Service[] = [
  {
    localeNS: 'services',
    localeKey: 'name.perks',
    route: 'perks',
    get routeElement() {
      return <Perks titleKey={this.localeKey} titleNS={this.localeNS} />
    }
  },
  {
    localeNS: 'services',
    localeKey: 'name.tempRoute',
    route: 'temproute',
    get routeElement() {
      return <TempRoute titleKey={this.localeKey} titleNS={this.localeNS} />
    }
  },
]
