import { getPerksData } from '../model/data';
import { PerkData } from '../types';
import { createSlice } from '@reduxjs/toolkit';

export type PerksState = PerkData[];

const initialState: PerksState = getPerksData();

export const perksSlice = createSlice({
  name: 'perks',
  initialState,
  reducers: {},
});

export default perksSlice.reducer;
