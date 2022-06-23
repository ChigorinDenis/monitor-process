import { configureStore } from '@reduxjs/toolkit';
import historyOperationReducer from './reducers/historyOperationReducer.js';
import uiReducer from './reducers/uiReducer.js';
import personReducer from './reducers/personReducer.js';
import operationReducer from './reducers/operationReducer.js';
import authReducer from './reducers/authReducer.js';
import blockReducer from './reducers/blockReducer.js';
import roleReducer from './reducers/roleReducer';
import launchReducer from './reducers/launchReducer.js';
import operationErrorReducer from './reducers/operationErrorReducer.js';


const store = configureStore({
  reducer: {
    historyOperation: historyOperationReducer,
    persons: personReducer,
    roles: roleReducer,
    operation: operationReducer,
    blocks: blockReducer,
    auth: authReducer,
    ui: uiReducer,
    launches: launchReducer,
    operationError: operationErrorReducer
  },
});

export default store;