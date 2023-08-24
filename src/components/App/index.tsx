import './style.scss'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../Header'
import { services } from '../../services'

export default function App(): JSX.Element {
  return (
    <>
      <Header />
      <Outlet />
      <Navigate to={services[0].route} />
    </>
  )
}
