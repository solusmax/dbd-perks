import clsx from 'clsx';

import { CustomComponentProps } from '@/types';

import './Searching.scss';

type SearchingProps = CustomComponentProps;

export default function Searching({ className }: SearchingProps): JSX.Element {
  return (
    <div className={clsx(className, 'searching')}>
      <div className="searching__icon" />
    </div>
  );
}
