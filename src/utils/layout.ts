import { AppLayout } from '@/consts';

export const isMobileBreakpoint = (windowWidth: number) => {
  return windowWidth < AppLayout.Breakpoint.Tablet;
};
