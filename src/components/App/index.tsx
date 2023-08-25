import './style.scss'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../Header'
import { services } from '../../data/services.tsx'

export default function App(): JSX.Element {
  return (
    <>
      <Header />
      <Outlet />
      <Navigate to={services[0].route} />
    </>
  )
}
