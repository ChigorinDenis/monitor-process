import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const launchSlice = createSlice({
  name: 'launch',
  initialState,
  reducers: {
    addLaunch: (state, { payload }) => {
      return [...state, payload];
    },
    addLaunches: (state, { payload }) => {
      return payload;
    },
  }
});

export const { addLaunch, addLaunches } = launchSlice.actions;

export default launchSlice.reducer;