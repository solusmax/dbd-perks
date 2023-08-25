import PerksPage from '../components/PerksPage';
import TempRoutePage from '../components/TempRoutePage';

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
      return <PerksPage titleKey={this.localeKey} titleNS={this.localeNS} />
    }
  },
  {
    localeNS: 'services',
    localeKey: 'name.tempRoute',
    route: 'temproute',
    get routeElement() {
      return <TempRoutePage titleKey={this.localeKey} titleNS={this.localeNS} />
    }
  },
]
