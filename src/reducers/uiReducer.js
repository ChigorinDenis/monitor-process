import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  selectedTask: {},
  selectedTab: 'work',
  dialogs: {
    operation: {
      open: false,
      mode: 'add',
      data: {}
    },
    detail: {
      open: false,
      mode: '',
      data: {}
    },
    errorGuides: {
      open: false,
      mode: '',
      data: {}
    },
    guides: {
      open: false,
      mode: '',
      data: {}
    },
  },
  checkOperations: [],
  selectedOperationId: '',
  selectedOperation: {},
  selectedBlockId: '',
  startedLaunch: {
    start: false,
    id: null
  }
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
    selectOperation : (state, { payload }) => {
      return {
        ...state,
        selectedOperation: payload
      }
    },
    selectBlockId : (state, { payload }) => {
      return {
        ...state,
        selectedBlockId: payload
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
      const { dialogName, mode = '', data = '' } = payload;
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
    startLaunch : (state, { payload }) => {
      return {
        ...state,
        startedLaunch: payload
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
  selectOperationId,
  selectOperation,
  selectBlockId,
  startLaunch
} = uiSlice.actions;

export default uiSlice.reducer;