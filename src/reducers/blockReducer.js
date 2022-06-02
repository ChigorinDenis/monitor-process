import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  blocks: [],
  launchBlocks: [],
};

export const blockSlice = createSlice({
  name: 'block',
  initialState,
  reducers: {
    addBlocks: (state, { payload }) => {
      return {
        ...state,
        blocks: payload
      };
    },
    addBlock: (state, { payload }) => {
      const { blocks } = state;
      blocks.push(payload);
      return;
    },
    addLaunchBlocks: (state, { payload }) => {
      return {
        ...state,
        launchBlocks: payload
      };
    }
  }
});

export const { addBlocks, addBlock, addLaunchBlocks } = blockSlice.actions;

export default blockSlice.reducer;