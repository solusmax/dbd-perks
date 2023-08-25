import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { services } from '../../data/services.tsx';

export default function Menu(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      {services.map((service) => {
        return (
          <NavLink
            key={service.localeKey}
            to={service.route}
          >
            {t(service.localeKey, {ns: service.localeNS})}
          </NavLink>
        )
      })}
    </>
  )
}
