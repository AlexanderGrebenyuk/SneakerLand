import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Basket } from './types/basketTypes';
import { SneakerId } from '../sneakers/types/sneakerType';
import BasketApi from './api/basketApi';

type StateBasket = {
  order: Basket[]; // проверить
};

const initialState: StateBasket = {
  order: [], // проверить
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
        console.log('PUSHSTATEBASK', action.payload);
        console.log('state.order=====', state.order);
        state.order.push(action.payload);
      })
      .addCase(getBasketThunk.fulfilled, (state, action) => {
        state.order.push(action.payload);
      });
  },
});

export default basketSlice;
