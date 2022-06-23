import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const operationErrorSlice = createSlice({
  name: 'operationError',
  initialState,
  reducers: {
    addOperationError: (state, { payload }) => {
      return [...payload];
    }
  }
});

export const { addOperationError } = operationErrorSlice.actions;

export default operationErrorSlice.reducer;