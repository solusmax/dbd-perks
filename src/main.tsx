import App from './components/App';
import LoadingPage from './components/LoadingPage';
import './i18n';
import { store } from './store/store';
import './styles/index.scss';
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <React.Suspense fallback={<LoadingPage />}>
        <App />
      </React.Suspense>
    </Provider>
  </React.StrictMode>,
);
