import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const roleReducer = createSlice({
  name: 'role',
  initialState,
  reducers: {
    addRoles: (state, { payload }) => {
      return [...payload];
    }
  }
});

export const { addRoles } = roleReducer.actions;

export default roleReducer.reducer;