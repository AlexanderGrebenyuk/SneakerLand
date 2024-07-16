import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import LikeApi from './api/likeApi';
import { Like, LikeId, LikeWithoutIdAndUserId } from './types/likeTypes';
// import { SneakerId } from "../sneakers/types/sneakerType";

type StateLike = {
  likes: Like[];
  error: undefined;
  loading: true;
};

const initialState: StateLike = {
  likes: [],
  error: undefined,
  loading: true,
};

export const getLikeThunk = createAsyncThunk('load/likess', () => LikeApi.getAllLike());

export const createLikeThunk = createAsyncThunk('add/likes', (body: LikeWithoutIdAndUserId) =>
  LikeApi.createLike(body),
);

export const removeLikeThunk = createAsyncThunk('delete/likes', (id: LikeId) =>
  LikeApi.deleteLike(id),
);

const likeSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getLikeThunk.fulfilled, (state, action) => {
        state.likes = action.payload;
      })

      .addCase(createLikeThunk.fulfilled, (state, action) => {
        state.likes.push(action.payload); // Добавляем новый лайк в массив
      })

      .addCase(removeLikeThunk.fulfilled, (state, action) => {
        console.log(action.payload, 'qqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqqq');

        state.likes = state.likes.filter((like) => like.sneakerId !== action.payload);
      });
  },
});

export default likeSlice;
