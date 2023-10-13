import { Tooltip } from 'react-tooltip';

import { getDbdVersion } from '@/model';

import About from '@/components/About/About';
import DbdVersion from '@/components/DbdVersion/DbdVersion';
import Header from '@/components/Header/Header';
import LanguageSwitcher from '@/components/LanguageSwitcher/LanguageSwitcher';
import Logo from '@/components/Logo/Logo';
import Main from '@/components/Main/Main';

import './App.scss';

export default function App(): JSX.Element {
  return (
    <>
      <Header className="app__header">
        <Logo className="app__logo" />
        <DbdVersion className="app__dbd-version" dbdVersion={getDbdVersion()} />
        <About className="app__about" />
      </Header>
      <Main className="app__main" />

      <LanguageSwitcher className="app__language-switcher" />

      <Tooltip
        className="app__tooltip"
        anchorSelect=".tooltip"
        place="bottom"
        opacity={0.95}
        closeOnEsc
        closeOnScroll
        render={({ content }) => <div>{content}</div>}
      />
    </>
  );
}
