import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const blockSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    addBlocks: (state, { payload }) => {
      return [...payload];
    },
    addBlock: (state, { payload }) => {
      return [...state, payload];
    },
    removeBlock: (state, { payload }) => {
      const { id } = payload;
      return state.filter((task) => task.id != id);
    },
  }
});

export const { addBlocks, addBlock, removeBlock } = blockSlice.actions;

export default blockSlice.reducer;