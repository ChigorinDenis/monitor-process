import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuth: false,
  user: {}
};

function checkUser(users, username, password) {
  const user = users.find((item) => item.username === username);
  if (!user) return false;
  if (user.password === password) {
    return true;
  }
  return false;
}

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn : (state, { payload }) => {
      state.isAuth = true;
      state.user = payload
    },
    logOut : (state) => {
      state.isAuth = false;
      state.user = {};
    },
    addUser : (state, { payload }) => {
      const { users } = state;
      return {
        ...state,
        users: [...users, payload]
      }  
    },
    removeUser : (state, { payload }) => {
      const { users } = state;
      return {
        ...state,
        users: users.filter((user) => user.id != payload.id)
      }  
    },
  }
});

export const { logIn, logOut, addUser, removeUser } = authSlice.actions;

export default authSlice.reducer;