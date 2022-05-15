import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: [
    {
      id: 1,
      fio: 'test name',
      username: 'testname',
      password: 'test',
      post: 'Инженер',
      roles: ['админ']
    },
    {
      id: 2,
      fio: 'Королев Сергей Павлович',
      username: 'korolev',
      password: '111',
      post: 'главный конструктор',
      roles: ['админ', 'главный конструктор']
    },
    {
      id: 3,
      fio: 'Билл Гейтс',
      username: 'billgates',
      password: '111',
      post: 'Инженер',
      roles: ['пользователь']
    },
    {
      id: 4,
      fio: 'Неделин Митрофан',
      username: 'nedelin',
      password: '111',
      post: 'руководитель работ',
      roles: ['руководитель']
    },
  ],
  isAuth: false,
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
      const { username, password } = payload;
      if (checkUser(state.users, username, password)) {
        return {
          ...state,
          isAuth: true
        }
      }
      return state;  
    },
    logOut : (state) => {
      return {
        ...state,
        isAuth: false,
      }  
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