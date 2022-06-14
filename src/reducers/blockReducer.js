import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import axios from 'axios';
import routes from '../routes';

export const fetchBlocksByLaunch = createAsyncThunk(
  'blocks/fetchBlocksByLaunch',
  async (launchId) => {
    const url = routes('getBlocksByLaunch')(launchId);
    const response = await axios.get(url);
    return response.data;
  }
);

const blocksAdapter = createEntityAdapter();


export const blockSlice = createSlice({
  name: 'block',
  initialState: blocksAdapter.getInitialState({
    entities: [],
    blocks: [],
    idBlockActive: '',
    loading: 'idle',
    error: null 
  }),
  reducers: {
    addBlocks: (state, { payload }) => {
      return {
        ...state,
        blocks: payload
      };
    },
    addBlock: (state, { payload }) => {
      const { blocks } = state;
      blocks.push(payload);
      return;
    },
    changeBlock: (state, { payload }) => {
      state.idBlockActive = payload;
    },
    addLaunchBlocks: (state, { payload }) => {
      const [ firstBlock ] = payload;
      return {
        ...state,
        idBlockActive: firstBlock?.id,
        launchBlocks: payload
      };
    },
    clearBlockEntities: (state) => {
      state.entities = [];
    },
  },
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder.addCase(fetchBlocksByLaunch.fulfilled, (state, { payload }) => {
      state.entities = [...payload];
      state.loading = 'idle';
      state.error = null;
    })
    .addCase(fetchBlocksByLaunch.rejected, (state, action) => {
      state.loading = 'failed';
      state.error = action.error;
    })
  },
});

export const { addBlocks, addBlock, addLaunchBlocks, changeBlock, clearBlockEntities } = blockSlice.actions;

export default blockSlice.reducer;