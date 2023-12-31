import { CustomComponentProps } from '@/types';

type SvgProps = CustomComponentProps & {
  icon:
    | 'arrow'
    | 'cross'
    | 'github'
    | 'killer-background'
    | 'settings'
    | 'triangle';
};

export default function SvgIcon({ className, icon }: SvgProps): JSX.Element {
  const getSvg = () => {
    switch (icon) {
      case 'arrow':
        return (
          <svg className={className} viewBox="0 0 12.01 7.01">
            <path d="M1.71 6.72 6 2.42l4.29 4.3a.996.996 0 1 0 1.41-1.41L6.71.3A.996.996 0 0 0 5.3.3l-5.01 5c-.39.39-.39 1.03 0 1.42s1.03.39 1.42 0Z" />
          </svg>
        );

      case 'cross':
        return (
          <svg
            className={className}
            viewBox="0 0 21 21"
            strokeLinecap="round"
            strokeWidth="4"
          >
            <path d="M2 18.97 18.97 2M19 19 2 2" />
          </svg>
        );

      case 'github':
        return (
          <svg className={className} viewBox="0 0 512 512">
            <path d="M256 0C115.39 0 0 115.39 0 256c0 119.988 84.195 228.984 196 256v-84.695c-11.078 2.425-21.273 2.496-32.55-.828-15.13-4.465-27.423-14.543-36.548-29.91-5.816-9.813-16.125-20.454-26.879-19.672l-2.636-29.883c23.254-1.992 43.37 14.168 55.312 34.23 5.305 8.922 11.41 14.153 19.246 16.465 7.575 2.23 15.707 1.16 25.184-2.187 2.379-18.973 11.07-26.075 17.637-36.075v-.015c-66.68-9.946-93.254-45.32-103.801-73.242-13.977-37.075-6.477-83.391 18.238-112.66.48-.571 1.348-2.063 1.012-3.106-11.332-34.23 2.476-62.547 2.984-65.55 13.078 3.866 15.203-3.892 56.809 21.386l7.191 4.32c3.008 1.793 2.063.77 5.07.543 17.372-4.719 35.684-7.324 53.727-7.558 18.18.234 36.375 2.84 54.465 7.75l2.328.234c-.203-.031.633-.149 2.035-.984 51.973-31.481 50.106-21.192 64.043-25.723.504 3.008 14.13 31.785 2.918 65.582-1.512 4.656 45.059 47.3 19.246 115.754-10.547 27.933-37.117 63.308-103.797 73.254v.015c8.547 13.028 18.817 19.957 18.762 46.832V512c111.809-27.016 196-136.012 196-256C512 115.39 396.61 0 256 0zm0 0" />
          </svg>
        );

      case 'killer-background':
        return (
          <svg className={className} viewBox="0 0 256 256">
            <path d="M57.21 6.5h138.92c5.66 0 10.76 3.43 12.9 8.68l40.62 99.71c2.12 5.2.91 11.17-3.07 15.13L137.74 238.33c-5.4 5.37-14.11 5.41-19.56.09L7.04 129.82a13.927 13.927 0 0 1-4.19-9.96c0-1.8.35-3.58 1.03-5.25L44.3 15.18c2.13-5.25 7.24-8.68 12.9-8.68Z" />
          </svg>
        );

      case 'settings':
        return (
          <svg className={className} viewBox="0 0 1920 1920">
            <path
              fillRule="evenodd"
              d="M1703.534 960c0-41.788-3.84-84.48-11.633-127.172l210.184-182.174-199.454-340.856-265.186 88.433c-66.974-55.567-143.323-99.389-223.85-128.415L1158.932 0h-397.78L706.49 269.704c-81.43 29.138-156.423 72.282-223.962 128.414l-265.073-88.32L18 650.654l210.184 182.174C220.39 875.52 216.55 918.212 216.55 960s3.84 84.48 11.633 127.172L18 1269.346l199.454 340.856 265.186-88.433c66.974 55.567 143.322 99.389 223.85 128.415L761.152 1920h397.779l54.663-269.704c81.318-29.138 156.424-72.282 223.963-128.414l265.073 88.433 199.454-340.856-210.184-182.174c7.793-42.805 11.633-85.497 11.633-127.285m-743.492 395.294c-217.976 0-395.294-177.318-395.294-395.294 0-217.976 177.318-395.294 395.294-395.294 217.977 0 395.294 177.318 395.294 395.294 0 217.976-177.317 395.294-395.294 395.294"
            />
          </svg>
        );

      case 'triangle':
        return (
          <svg className={className} viewBox="0 0 123.959 123.959">
            <path d="m85.742 1.779-56 56c-2.3 2.3-2.3 6.1 0 8.401l56 56c3.801 3.8 10.2 1.1 10.2-4.2v-112c0-5.301-6.399-8.001-10.2-4.201z" />
          </svg>
        );
    }
  };

  return getSvg();
}
