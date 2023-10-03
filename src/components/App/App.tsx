import Footer from '@/components/Footer/Footer';
import Header from '@/components/Header/Header';
import Main from '@/components/Main/Main';

import './styles.scss';

export default function App(): JSX.Element {
  return (
    <>
      <Header className="app__header" />
      <Main className="app__main" />
      <Footer className="app__footer" />
    </>
  );
}
