import { RootState } from '../store/store';
import { useSelector } from 'react-redux';

export function useIsLegacyMode(perkId: string | null) {
  const legaciedPerkIds = useSelector(
    (state: RootState) => state.app.legaciedPerkIds,
  );

  if (perkId === null) {
    return false;
  }

  return legaciedPerkIds.includes(perkId);
}
