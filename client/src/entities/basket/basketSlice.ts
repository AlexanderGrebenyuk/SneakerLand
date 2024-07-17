import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Basket } from './types/basketTypes';
import { SneakerId } from '../sneakers/types/sneakerType';
import BasketApi from './api/basketApi';


type StateBasket = {
  basket: Basket[]; // проверить
};

const initialState: StateBasket = {
basket: [], // проверить
};
export const createBasketThunk = createAsyncThunk('add/basket', (body: SneakerId) =>
  BasketApi.createBasket(body),
);

export const getBasketThunk = createAsyncThunk('load/basket', () => BasketApi.getBasket());

const basketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(createBasketThunk.fulfilled, (state, action) => {
        state.basket.push(action.payload);
      })
      .addCase(getBasketThunk.fulfilled, (state, action) => {
        state.basket = action.payload;
      });
  },
});

export default basketSlice;
