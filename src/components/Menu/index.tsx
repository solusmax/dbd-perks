import { NavLink } from 'react-router-dom';
import { services } from '../../data/services.tsx';

export default function Menu(): React.JSX.Element {
  return (
    <>
      {services.map((service) => {
        return (
          <NavLink
            key={service.title}
            to={service.route}
          >
            {service.title}
          </NavLink>
        )
      })}
    </>
  )
}
