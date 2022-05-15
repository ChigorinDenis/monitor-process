import { configureStore } from '@reduxjs/toolkit';
import taskReducer from './reducers/taskReducer.js';
import uiReducer from './reducers/uiReducer.js';
import personReducer from './reducers/personReducer.js';
import taskEditedReducer from './reducers/taskEditedReducer.js';
import authReducer from './reducers/authReducer.js';

const store = configureStore({
  reducer: {
    tasks: taskReducer,
    persons: personReducer,
    tasksEdited: taskEditedReducer,
    auth: authReducer,
    ui: uiReducer
  },
});

export default store;