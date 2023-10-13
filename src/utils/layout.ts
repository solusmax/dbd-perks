import { AppLayout } from '@/consts';

export const isMobileBreakpoint = (windowWidth: number | null) => {
  if (windowWidth === null) {
    return true;
  }

  return windowWidth < AppLayout.Breakpoint.Tablet;
};
