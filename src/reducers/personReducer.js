import { createSlice } from '@reduxjs/toolkit';

const initialState = [
  {
    id: 1,
    fullname: 'Билл Гейст',
    position: 'Инженер',
    username: 'billgates',
    roles: ['пользователь']
  },
  {
    id: 2,
    fullname: 'Сикорский Игорь Иванович',
    position: 'Инженер',
    username: 'sikorski',
    roles: ['пользователь']
  },
  {
    id: 3,
    fullname: 'Королёв Сергей Павлович',
    position: 'Главный конструктор',
    username: 'korolev',
    roles: ['главный конструктор', 'админ']
  },
  {
    id: 4,
    fullname: 'Леонов Алексей Архипович',
    position: 'Руководитель работ',
    username: 'leonov',
    roles: ['руководитель' ]
  }
];

export const personSlice = createSlice({
  name: 'persons',
  initialState,
  reducers: {
    addPerson: (state, { payload }) => {
      return [...state, payload];
    },
    updatePersons: (state, { payload }) => {
      return payload;
    },
    removePerson: (state, { payload }) => {
      const { id } = payload;
      return state.filter((person) => person.id != id);
    },
  }
});

export const { addPerson, updaPersonss, removePerson } = personSlice.actions;

export default personSlice.reducer;