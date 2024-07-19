import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ColorForForm, ColorForFormWithoutId } from './types/colorType';
import ColorApi from './api/colorApi';

type StateColor = {
  colors: ColorForForm[];
};

const initialState: StateColor = {
  colors: [],
};
export const createColorThunk = createAsyncThunk('add/color', (body: ColorForFormWithoutId) =>
  ColorApi.createColor(body),
);
export const getColorThunk = createAsyncThunk('load/color', () => ColorApi.getAllColor());

const colorSlice = createSlice({
  name: 'colors',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createColorThunk.fulfilled, (state, action) => {
        state.colors.push(action.payload);
      })
      .addCase(getColorThunk.fulfilled, (state, action) => {
        state.colors = action.payload;
      });
  },
});

export default colorSlice;
