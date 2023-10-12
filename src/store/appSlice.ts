import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

import { SortDirection } from '@/consts';
import { removeElementFromArray } from '@/utils';

import { SortDirections } from '@/types';

export type AppState = {
  isSearching: boolean;
  searchText: string;
  killerPerksShown: boolean;
  survivorPerksShown: boolean;
  sortDirection: SortDirections;
  selectedPerkId: string | null;
  legaciedPerkIds: string[];
};

const initialState: AppState = {
  isSearching: false,
  searchText: '',
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
    setIsSeaching: (state, action: PayloadAction<boolean>) => {
      state.isSearching = action.payload;
    },
    setSearchText: (state, action: PayloadAction<string>) => {
      state.searchText = action.payload;
    },
    toggleKillerPerksShown: (state) => {
      state.killerPerksShown = !state.killerPerksShown;
    },
    toggleSurvivorPerksShown: (state) => {
      state.survivorPerksShown = !state.survivorPerksShown;
    },
    setSortDirection: (state, action: PayloadAction<SortDirections>) => {
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
    clearSelectedPerkId: (state) => {
      state.selectedPerkId = null;
    },
  },
});

export const {
  setIsSeaching,
  setSearchText,
  toggleKillerPerksShown,
  toggleSurvivorPerksShown,
  setSortDirection,
  toogleLegacyPerk,
  setSelectedPerkId,
  clearSelectedPerkId,
} = appSlice.actions;

export default appSlice.reducer;
