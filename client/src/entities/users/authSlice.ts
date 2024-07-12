import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import Tokens from './api/tokensApi';
import AuthApi from './api/userApi';
import type { User, UserWithoutIdwithPassword, UserWithoutName } from './types/userTypes';

type StateAuth = {
  user: User | undefined;
  accessToken: string | undefined;
  error: string | undefined;
  loading: boolean;
};

const initialState: StateAuth = {
  user: undefined,
  accessToken: undefined,
  error: undefined,
  loading: true,
};
// действие, которое нужно сделать
export const registrationThunk = createAsyncThunk(
  'registration/user',
  (body: UserWithoutIdwithPassword) => AuthApi.registartion(body),
);

export const refreshTokens = createAsyncThunk('refreshTokens/user', () => Tokens.refreshTokens());

export const logoutThunk = createAsyncThunk('logout/user', () => AuthApi.logout());

export const authorizationThunk = createAsyncThunk('authorization/user', (body: UserWithoutName) =>
  AuthApi.authrozation(body),
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  // стнхронные редьюсеры
  reducers: {},
  extraReducers: (builder) => {
    // описываем все возможные исходы действия
    builder
      .addCase(registrationThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(registrationThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(registrationThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(refreshTokens.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(refreshTokens.pending, (state) => {
        state.loading = true;
      })
      .addCase(refreshTokens.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(authorizationThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
        state.loading = false;
        state.error = undefined;
      })
      .addCase(authorizationThunk.pending, (state) => {
        state.loading = true;
      })
      .addCase(authorizationThunk.rejected, (state, action) => {
        state.error = action.error.message;
        state.loading = false;
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.user = undefined;
        state.accessToken = undefined;
      });
  },
});

export default authSlice;