import { CustomComponentProps } from '@/types';

import SvgIcon from '@/components/SvgIcon/SvgIcon';

import './About.scss';

type AboutProps = CustomComponentProps;

export default function About({
  className = '',
}: AboutProps = {}): JSX.Element {
  return (
    <div className={`about ${className}`}>
      <a
        className="tooltip about__link"
        href="https://github.com/solusmax/dbd-perks"
        data-tooltip-content="GitHub"
      >
        <span className="visually-hidden">GitHub</span>
        <SvgIcon className="about__icon" icon="github" />
      </a>
    </div>
  );
}
