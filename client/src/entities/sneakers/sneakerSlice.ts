import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ColorWithoutId, Sneaker, SneakerId, SneakerWithoutId } from './types/sneakerType';
import SneakerApi from './api/sneakerApi';

type StateSneakers = {
  sneakers: Sneaker[];
};

const initialState: StateSneakers = {
  sneakers: [],
};

export const getSneakersThunk = createAsyncThunk('load/sneakers', () =>
  SneakerApi.getAllSneakers(),
);

// создать новую санку для фильтрации по параметрам

export const createSneakerThunk = createAsyncThunk<Sneaker, SneakerWithoutId>(
  'add/sneakers',
  (body: SneakerWithoutId) => SneakerApi.createSneaker(body),
);

export const removeSneakerThunk = createAsyncThunk('remove/sneakers', (id: SneakerId) =>
  SneakerApi.removeSneaker(id),
);

export const createColorThunk = createAsyncThunk('add/color', (body: ColorWithoutId) =>
  SneakerApi.createColor(body),
);

const sneakerSlice = createSlice({
  name: 'sneakers',
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getSneakersThunk.fulfilled, (state, action) => {
        state.sneakers = action.payload;
      })
      .addCase(removeSneakerThunk.fulfilled, (state, action) => {
        state.sneakers = state.sneakers.filter((sneaker) => sneaker.id !== action.payload);
      })
      .addCase(createSneakerThunk.fulfilled, (state, action) => {
        state.sneakers.push(action.payload);
      });
    //   .addCase(updateSneakerThunk.fulfilled, (state, action) => {
    //     state.sneakers = state.sneakers.map((sneaker) => sneaker.id === action.payload.id ? action.payload : sneaker)
    //   })
    //   .addCase(createMovieThunk.fulfilled, (state, action) => {
    //     state.movies.push(action.payload);
    //   })
    //   .addCase(removeMovieThunk.fulfilled, (state, action) => {
    //     state.movies = state.movies.filter((movie) => movie.id !== action.payload);
    //   })
    //   .addCase(updateMovieThunk.fulfilled, (state, action) => {
    //     state.movies = state.movies.map((movie) =>
    //       movie.id === action.payload.id ? action.payload : movie,
    //     );
    //   });
  },
});

export default sneakerSlice;
