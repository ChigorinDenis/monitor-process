import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addHistoryOperations: (state, { payload }) => {
      return [ ...payload ];
    },
    updatePercent: (state, { payload }) => {
      payload.forEach((item) => {
        const { id_history, percent } = item;
        const needUpdate = find((need) => need.id_history === id_history);
        
        needUpdate.percent = percent;
      })
    },
    removeTask: (state, { payload }) => {
      const { id } = payload;
      return state.filter((task) => task.id != id);
    },
  }
});

export const { addHistoryOperations, updatePercent, removeTask } = taskSlice.actions;

export default taskSlice.reducer;