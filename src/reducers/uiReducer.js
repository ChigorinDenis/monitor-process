import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTask: {},
  selectedTab: 'work'
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    selectTask : (state, { payload }) => {
      return {
        ...state,
        selectedTask: payload
      }
    },
    selectTab : (state, { payload }) => {
      return {
        ...state,
        selectedTab: payload
      }
    },
  }
});

export const { selectTask, selectTab} = uiSlice.actions;

export default uiSlice.reducer;