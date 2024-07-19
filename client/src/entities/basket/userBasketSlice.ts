//@ts-nocheck
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SneakerId } from '../sneakers/types/sneakerType';
import BasketApi from './api/basketApi';
import { Basket, OrderLineId } from './types/basketTypes';

type StateBasket = {
  order: Basket | undefined; // Добавила []
  basket: (Basket & { Orders: { statusId: number; id: number; totalPrice: number }[] }) | undefined;
};

const initialState: StateBasket = {
  order: undefined,
  basket: undefined,
};
export const createBasketThunk = createAsyncThunk('add/basket', (body: SneakerId) =>
  BasketApi.createBasket(body),
);
export const updateOrderUserThunk = createAsyncThunk('updateUser/basket', (id: OrderLineId) =>
  BasketApi.updateOrderUser(id),
);
export const getAllUserBaskets = createAsyncThunk('load/userBasket', () =>
  BasketApi.getBasketUser(),
);

export const getBasket = createAsyncThunk('orders/basket/user', () => BasketApi.allOrderApi());
const userBasketSlice = createSlice({
  name: 'basket',
  initialState,
  reducers: {
    clearBasket: (state) => {
      state.order = undefined;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createBasketThunk.fulfilled, (state, action) => {
        state.order = action.payload;
        console.log('AAAAAAA', state.order);
      })
      .addCase(updateOrderUserThunk.fulfilled, (state) => {
        state.order = undefined;
      })
      .addCase(getAllUserBaskets.fulfilled, (state, action) => {
        console.log('CASE', action.payload);
        state.order = action.payload;
      })
      .addCase(getBasket.fulfilled, (state, action) => {
        state.basket = action.payload;
      });
  },
});
export const { clearBasket } = userBasketSlice.actions;

export default userBasketSlice;
