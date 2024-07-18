import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { OrderLineId, OrderLinesForStatus } from './types/basketTypes';

import BasketApi from './api/basketApi';

type StateBasket = {
  order: OrderLinesForStatus | undefined; // проверить
};

const initialState: StateBasket = {
  order: undefined, // проверить
};

export const getBasketsAdminThunk = createAsyncThunk('load/basket', () => BasketApi.getAllBasketsAdmin());
export const updateOrderAdminThunk = createAsyncThunk('updateAdmin/basket', (id:OrderLineId) => BasketApi.updateOrderAdmin(id))

const adminBasketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    clearBasket: (state) => {
      state.order = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBasketsAdminThunk.fulfilled, (state, action) => {
        state.order = action.payload;
      })
      .addCase(updateOrderAdminThunk.fulfilled, (state, action) => {
        state.order = action.payload;
      })
  },
});
export const { clearBasket } = adminBasketSlice.actions;

export default adminBasketSlice;
