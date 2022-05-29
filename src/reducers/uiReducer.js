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
  },
  checkOperations: [],
  selectedOperationId: '',
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    selectOperationId : (state, { payload }) => {
      return {
        ...state,
        selectedOperationId: payload
      }
    },
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
    addCheckOperations : (state, { payload }) => {
      return {
        ...state,
        checkOperations: payload
      }
    },
  }
});

export const {
  selectTask,
  selectTab,
  openDialog,
  closeDialog,
  addCheckOperations,
  selectOperationId
} = uiSlice.actions;

export default uiSlice.reducer;