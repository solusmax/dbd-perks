import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { SortDirection } from '@/consts';
import { removeElementFromArray } from '@/utils';

export type AppState = {
  searchText: string;
  isSearchByDescription: boolean;
  killerPerksShown: boolean;
  survivorPerksShown: boolean;
  sortDirection: SortDirection;
  selectedPerkId: string | null;
  legaciedPerkIds: string[];
};

const initialState: AppState = {
  searchText: '',
  isSearchByDescription: false,
  killerPerksShown: true,
  survivorPerksShown: true,
  sortDirection: SortDirection.Down,
  selectedPerkId: null,
  legaciedPerkIds: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    setIsSearchByDescripton: (state, action: PayloadAction<boolean>) => {
      state.isSearchByDescription = action.payload;
    },
    setIsKillerPerksShown: (state, action: PayloadAction<boolean>) => {
      state.killerPerksShown = action.payload;

      if (!state.killerPerksShown && !state.survivorPerksShown) {
        state.killerPerksShown = true;
      }
    },
    setIsSurvivorPerksShown: (state, action: PayloadAction<boolean>) => {
      state.survivorPerksShown = action.payload;

      if (!state.killerPerksShown && !state.survivorPerksShown) {
        state.survivorPerksShown = true;
      }
    },
    setSortDirection: (state, action: PayloadAction<SortDirection>) => {
      state.sortDirection = action.payload;
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
  },
});

export const {
  setSearchText,
  setIsSearchByDescripton,
  setIsKillerPerksShown,
  setIsSurvivorPerksShown,
  setSortDirection,
  toogleLegacyPerk,
  setSelectedPerkId,
} = appSlice.actions;

export default appSlice.reducer;
