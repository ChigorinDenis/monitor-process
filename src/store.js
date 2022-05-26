import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './reducers/taskReducer.js';
import uiReducer from './reducers/uiReducer.js';
import personReducer from './reducers/personReducer.js';
import operationReducer from './reducers/operationReducer.js';
import authReducer from './reducers/authReducer.js';
import blockReducer from './reducers/blockReducer.js';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    persons: personReducer,
    operation: operationReducer,
    blocks: blockReducer,
    auth: authReducer,
    ui: uiReducer
  },
});

export default store;