import { CustomComponentProps } from '@/types';

type SorterProps = CustomComponentProps & {
  icon: 'arrow' | 'cross';
};

export default function SvgIcon({
  className = '',
  icon,
}: SorterProps): React.JSX.Element {
  const getSvg = () => {
    switch (icon) {
      case 'cross':
        return (
          <svg
            className={`${className}`}
            viewBox="0 0 21 21"
            strokeLinecap="round"
            strokeWidth="4"
          >
            <path d="M2 18.97 18.97 2M19 19 2 2" />
          </svg>
        );

      case 'arrow':
        return (
          <svg className={`${className}`} viewBox="0 0 12.01 7.01">
            <path d="M1.71 6.72 6 2.42l4.29 4.3a.996.996 0 1 0 1.41-1.41L6.71.3A.996.996 0 0 0 5.3.3l-5.01 5c-.39.39-.39 1.03 0 1.42s1.03.39 1.42 0Z" />
          </svg>
        );
    }
  };

  return getSvg();
}
