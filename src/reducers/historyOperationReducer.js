import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    addHistoryOperations: (state, { payload }) => {
      return [ ...payload ];
    },
    updateTasks: (state, { payload }) => {
      return payload;
    },
    removeTask: (state, { payload }) => {
      const { id } = payload;
      return state.filter((task) => task.id != id);
    },
  }
});

export const { addHistoryOperations, updateTasks, removeTask } = taskSlice.actions;

export default taskSlice.reducer;