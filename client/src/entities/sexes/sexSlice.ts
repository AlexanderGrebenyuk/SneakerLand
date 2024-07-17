import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SexForSelect } from './types/sexType';
import SexApi from './api/sexApi';

type StateSexes = {
  sexes: SexForSelect[];
};

const initialState: StateSexes = {
    sexes: [],
};

export const getSexThunk = createAsyncThunk('load/sexes', () => SexApi.getAllSexes());

const sexSlice = createSlice({
  name: 'sexes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getSexThunk.fulfilled, (state, action) => {
      state.sexes = action.payload;
    });
  },
});

export default sexSlice;

