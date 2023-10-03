import { useSelector } from 'react-redux';

import { RootState } from '@/store/store';

export function useIsLegacyMode(perkId: string | null) {
  const legaciedPerkIds = useSelector(
    (state: RootState) => state.app.legaciedPerkIds,
  );

  if (perkId === null) {
    return false;
  }

  return legaciedPerkIds.includes(perkId);
}
