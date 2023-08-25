import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from 'react-router-dom';
import './global/scss/index.scss'
import App from './components/App'
import ErrorPage from './routes/ErrorPage';
import { services } from './services';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<App />}
      errorElement={<ErrorPage title='404' />}
    >
      {services.map((service, i) => {
        return (
          <Route
            key={service.title}
            index={!i}
            path={service.route}
            element={service.routeElement}
          />
        )
      })}
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
