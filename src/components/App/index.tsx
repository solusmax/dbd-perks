import './styles.scss';
import Header from '../Header';
import Main from '../Main';
import Footer from '../Footer';

export default function App(): JSX.Element {
  return (
    <>
      <Header className="app__header" />
      <Main className="app__main" />
      <Footer className="app__footer" />
    </>
  )
}
