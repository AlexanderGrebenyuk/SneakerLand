import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OrderLineId, OrderLinesForStatus } from './types/basketTypes';

import BasketApi from './api/basketApi';

type StateBasket = {
  orders: OrderLinesForStatus[] | undefined; // проверить
};

const initialState: StateBasket = {
  orders: undefined, // проверить
};

export const getBasketsAdminThunk = createAsyncThunk('load/basket', () => BasketApi.getAllBasketsAdmin());
export const updateOrderAdminThunk = createAsyncThunk('updateAdmin/basket', (id:OrderLineId) => BasketApi.updateOrderAdmin(id))

const adminBasketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    clearBasket: (state) => {
      state.orders = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBasketsAdminThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
      .addCase(updateOrderAdminThunk.fulfilled, (state, action) => {
        state.orders = action.payload;
      })
  },
});
export const { clearBasket } = adminBasketSlice.actions;

export default adminBasketSlice;
