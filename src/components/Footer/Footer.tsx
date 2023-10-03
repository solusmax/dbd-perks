import { CustomComponentProps } from '../../types';
import './styles.scss';

type FooterProps = CustomComponentProps;

export default function Footer({
  className = '',
}: FooterProps = {}): React.JSX.Element {
  return (
    <footer className={`footer ${className}`}>
      <a className="footer__link" href="https://github.com/solusmax/dbd-perks">
        GitHub
      </a>
    </footer>
  );
}