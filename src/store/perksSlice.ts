import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { PerkData } from '@/types';

export type PerksState = {
  perks: PerkData[];
};

const initialState: PerksState = {
  perks: [],
};

export const perksSlice = createSlice({
  name: 'perks',
  initialState,
  reducers: {
    setPerks: (state, action: PayloadAction<PerkData[]>) => {
      state.perks = action.payload;
    },
  },
});

export const { setPerks } = perksSlice.actions;

export default perksSlice.reducer;
