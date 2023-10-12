import Header from '@/components/Header/Header';

import './LoadingPage.scss';

export default function LoadingPage(): JSX.Element {
  return (
    <div className="loaging-page">
      <Header className="loading-page__header" />
      <span className="loading-page__spinner" />
    </div>
  );
}
