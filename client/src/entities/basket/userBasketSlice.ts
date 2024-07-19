import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SneakerId } from '../sneakers/types/sneakerType';
import BasketApi from './api/basketApi';
import { Basket, OrderLineId } from './types/basketTypes';

type StateBasket = {
  order: Basket | undefined; // Добавила []
};

const initialState: StateBasket = {
  order: undefined, 
};
export const createBasketThunk = createAsyncThunk('add/basket', (body: SneakerId) =>
  BasketApi.createBasket(body),
);
export const updateOrderUserThunk = createAsyncThunk('updateUser/basket', (id: OrderLineId) =>
  BasketApi.updateOrderUser(id),
);
export const getAllUserBaskets = createAsyncThunk('load/userBasket', () => BasketApi.getBasketUser())

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
        console.log(state.order);
        
      })
      .addCase(updateOrderUserThunk.fulfilled, (state) => {
        state.order = undefined; 
      }).addCase(getAllUserBaskets.fulfilled, (state, action) => {
        state.order = action.payload // 
      })
  },
});
export const { clearBasket } = userBasketSlice.actions;

export default userBasketSlice;
