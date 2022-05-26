import { createSlice } from '@reduxjs/toolkit';

// function createData(id, operation, timeStart, duration) {
//   return { id, operation, timeStart, duration };
// }
const initialState = [];
// const initialState = [
//   createData(1, 'Выгрузка, проверка и приемка сопроводительной документации на изделия', '00.00', '06.00'),
//   createData(2, 'Внешний осмотр вагонов и их пломбировки, приемка комплектующих изделий', '02.00', '06.00'),
//   createData(3, 'Выгрузка, проверка и приемка сопроводительной документации на изделия', '00.00', '06.00'),
//   createData(4, 'Подготовка (смазка), паранитовых прокладок', '08.05', '01.00'),
// ];


export const operationSlice = createSlice({
  name: 'operations',
  initialState,
  reducers: {
    addOperations: (state, { payload }) => {
      return [...payload];
    },
    addOperation: (state, { payload }) => {
      return [...state, payload];
    },
    updateOperation: (state, { payload }) => {
      const { id, timeStart, duration, description } = payload;
      const operation = state.find((item) => item.id === id)
      operation.timeStart = timeStart;
      operation.duration = duration;
      operation.description = description;
      return;
    },
    removeOperation: (state, { payload }) => {
      const { id } = payload;
      return state.filter((task) => task.id != id);
    },
  }
});

export const { addOperations, addOperation, updateOperation ,removeOperation } = operationSlice.actions;

export default operationSlice.reducer;