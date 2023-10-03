import { createSlice } from '@reduxjs/toolkit';

import { getPerksData } from '@/model/data';

import { PerkData } from '@/types';

export type PerksState = PerkData[];

const initialState: PerksState = getPerksData();

export const perksSlice = createSlice({
  name: 'perks',
  initialState,
  reducers: {},
});

export default perksSlice.reducer;
