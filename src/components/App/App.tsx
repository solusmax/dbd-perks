import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Main from '../Main/Main';
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
