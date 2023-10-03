import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { SortDirection } from '@/consts';
import { removeElementFromArray } from '@/utils';

import { SortDirections } from '@/types';

export type AppState = {
  sortDirection: SortDirections;
  killerPerksShown: boolean;
  survivorPerksShown: boolean;
  selectedPerkId: string | null;
  legaciedPerkIds: string[];
};

const initialState: AppState = {
  sortDirection: SortDirection.Down,
  killerPerksShown: true,
  survivorPerksShown: true,
  selectedPerkId: null,
  legaciedPerkIds: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSortDirection: (state, action: PayloadAction<SortDirections>) => {
      state.sortDirection = action.payload;
    },
    toggleKillerPerksShown: (state) => {
      state.killerPerksShown = !state.killerPerksShown;
    },
    toggleSurvivorPerksShown: (state) => {
      state.survivorPerksShown = !state.survivorPerksShown;
    },
    toogleLegacyPerk: (state, action: PayloadAction<string>) => {
      if (state.legaciedPerkIds.includes(action.payload)) {
        state.legaciedPerkIds = removeElementFromArray<string>(
          state.legaciedPerkIds,
          action.payload,
        );
      } else {
        state.legaciedPerkIds.push(action.payload);
      }
    },
    setSelectedPerkId: (state, action: PayloadAction<string | null>) => {
      state.selectedPerkId = action.payload;
    },
    clearSelectedPerkId: (state) => {
      state.selectedPerkId = null;
    },
  },
});

export const {
  toggleKillerPerksShown,
  toggleSurvivorPerksShown,
  setSortDirection,
  toogleLegacyPerk,
  setSelectedPerkId,
  clearSelectedPerkId,
} = appSlice.actions;

export default appSlice.reducer;
