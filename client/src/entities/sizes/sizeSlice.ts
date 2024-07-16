import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SizeForSelect } from './types/sizeType';
import SizeApi from './api/sizeApi';

type StateSizes = {
  sizes: SizeForSelect[];
};

const initialState: StateSizes = {
  sizes: [],
};

export const getSizeThunk = createAsyncThunk('load/sizes', () => SizeApi.getAllSizes());

const sizeSlice = createSlice({
  name: 'sizes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSizeThunk.fulfilled, (state, action) => {
      state.sizes = action.payload;
    });
  },
});

export default sizeSlice;
