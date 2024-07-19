import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { BrandForForm, BrandForFormWithoutId } from './types/brandType';
import BrandApi from './api/brandApi';

type StateBrand = {
  brands: BrandForForm[];
};

const initialState: StateBrand = {
  brands: [],
};
export const createBrandThunk = createAsyncThunk('add/brand', (body: BrandForFormWithoutId) =>
  BrandApi.createBrand(body),
);

export const getBrandThunk = createAsyncThunk('load/brands', () => BrandApi.getAllBrand());

const brandSlice = createSlice({
  name: 'brands',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBrandThunk.fulfilled, (state, action) => {
        state.brands.push(action.payload);
      })
      .addCase(getBrandThunk.fulfilled, (state, action) => {
        state.brands = action.payload;
      });
  },
});

export default brandSlice;
