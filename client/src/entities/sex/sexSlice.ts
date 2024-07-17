import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SexForForm, SexForFormWithoutId } from './types/sexType';
import SexApi from './api/sexApi';

type StateSex = {
  sexes: SexForForm[];
};

const initialState: StateSex = {
  sexes: [],
};
export const createSexThunk = createAsyncThunk('add/sexes', (body: SexForFormWithoutId) =>
  SexApi.createSex(body),
);

export const getSexThunk = createAsyncThunk('load/sexes', () => SexApi.getAllSex());

const sexSlice = createSlice({
  name: 'sexes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createSexThunk.fulfilled, (state, action) => {
        state.sexes.push(action.payload);
      })
      .addCase(getSexThunk.fulfilled, (state, action) => {
        state.sexes = action.payload;
      });
  },
});

export default sexSlice;
