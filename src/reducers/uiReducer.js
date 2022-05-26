import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTask: {},
  selectedTab: 'work',
  dialogs: {
    operation: {
      open: false,
      mode: 'add',
      data: {}
    }
  }
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
    openDialog : (state, { payload }) => {
      const { dialogs } = state;
      const { dialogName, mode, data = '' } = payload;
      return {
        ...state,
        dialogs: {
          ...dialogs,
          [dialogName]: {
            open: true,
            mode,
            data
          }
        }
      }
    },
    closeDialog : (state, { payload }) => {
      const { dialogs } = state;
      const { dialogName } = payload;
      return {
        ...state,
        dialogs: {
          ...dialogs,
          [dialogName]: {
            open: false,
          }
        }
      }
    },
  }
});

export const { selectTask, selectTab, openDialog, closeDialog} = uiSlice.actions;

export default uiSlice.reducer;