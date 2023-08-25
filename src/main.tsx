import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider
} from 'react-router-dom';
import './i18n';
import './styles/index.scss'
import LoadingPage from './components/LoadingPage/index.tsx';
import App from './components/App'
import ErrorPage from './components/ErrorPage/index.tsx';
import { services } from './data/services.tsx';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<App />}
      errorElement={<ErrorPage titleKey='documentTitle.errorPage' titleNS='app' />}
    >
      {services.map((service, i) => {
        return (
          <Route
            key={service.localeKey}
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
    <React.Suspense fallback={<LoadingPage />}>
      <RouterProvider router={router} />
    </React.Suspense>
  </React.StrictMode>,
)
