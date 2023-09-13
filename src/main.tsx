import React from 'react'
import ReactDOM from 'react-dom/client'
import './i18n';
import LoadingPage from './components/LoadingPage';
import App from './components/App'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <React.Suspense fallback={<LoadingPage />}>
      <App />
    </React.Suspense>
  </React.StrictMode>,
)
