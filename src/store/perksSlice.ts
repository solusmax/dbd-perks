import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

import { PerkData } from '@/types';

export type PerksState = {
  perks: PerkData[];
  perksById: Record<string, PerkData>;
};

const initialState: PerksState = {
  perks: [],
  perksById: {},
};

export const perksSlice = createSlice({
  name: 'perks',
  initialState,
  reducers: {
    setPerks: (state, action: PayloadAction<PerkData[]>) => {
      state.perks = action.payload;

      action.payload.forEach((perk) => {
        state.perksById[perk.id] = perk;
      });
    },
  },
});

export const { setPerks } = perksSlice.actions;

export default perksSlice.reducer;
