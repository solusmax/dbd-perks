import { removeElementFromArray } from '../utils';
import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export type AppState = {
  selectedPerkId: string | null;
  legaciedPerkIds: string[];
};

const initialState: AppState = {
  selectedPerkId: null,
  legaciedPerkIds: [],
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
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

export const { toogleLegacyPerk, setSelectedPerkId, clearSelectedPerkId } =
  appSlice.actions;

export default appSlice.reducer;
