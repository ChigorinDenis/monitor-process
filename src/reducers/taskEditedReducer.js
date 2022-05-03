import { createSlice } from '@reduxjs/toolkit';

function createData(id, operation, timeStart, duration) {
  return { id, operation, timeStart, duration };
}

const initialState = [
  createData(1, 'Выгрузка, проверка и приемка сопроводительной документации на изделия', '00.00', '06.00'),
  createData(2, 'Внешний осмотр вагонов и их пломбировки, приемка комплектующих изделий', '02.00', '06.00'),
  createData(3, 'Выгрузка, проверка и приемка сопроводительной документации на изделия', '00.00', '06.00'),
  createData(4, 'Подготовка (смазка), паранитовых прокладок', '08.05', '01.00'),
];


export const taskEditedSlice = createSlice({
  name: 'editedTasks',
  initialState,
  reducers: {
    addEditedTask: (state, { payload }) => {
      return [...state, payload];
    },
    removeEditedTask: (state, { payload }) => {
      const { id } = payload;
      return state.filter((task) => task.id != id);
    },
  }
});

export const { addEditedTask, removeEditedTask } = taskEditedSlice.actions;

export default taskEditedSlice.reducer;