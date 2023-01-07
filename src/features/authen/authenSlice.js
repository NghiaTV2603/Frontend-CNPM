import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import cookie from 'js-cookie';

import authenAPI from './authenAPI';

export const loginAction = createAsyncThunk(
  'authen/login',
  async (params, { rejectWithValue }) => {
    try {
      const response = await authenAPI.login(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const registerAction = createAsyncThunk(
  'authen/register',
  async (params, { rejectWithValue }) => {
    try {
      const response = await authenAPI.register(params);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

export const getInforAction = createAsyncThunk(
  'authen/user-info',
  async (params, { rejectWithValue }) => {
    try {
      const accessToken = cookie.get('accessToken');
      const response = await authenAPI.getInfor({ accessToken });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error?.response?.data?.message || error?.response || error
      );
    }
  }
);

const authenSlice = createSlice({
  name: 'authen',
  initialState: {
    userData: null,
    isAuth: false,
    accessToken: null,

    isLogin: false,
    loginMsg: null,

    isRegister: false,
    registerMsg: null,

    isGetUserInfor: false,
    getUserInforMsg: null,
  },
  reducers: {
    logout(state) {
      state.userData = null;
      state.isAuth = false;
      state.accessToken = null;
      cookie.remove('accessToken');
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getInforAction.pending, (state, action) => {
        state.isGetUserInfor = true;
        state.getUserInforMsg = null;
      })
      .addCase(getInforAction.fulfilled, (state, action) => {
        state.isGetUserInfor = false;
        state.getUserInforMsg = null;
        state.userData = action.payload.data.user;
        state.isAuth = true;
      })
      .addCase(getInforAction.rejected, (state, action) => {
        state.isFetchingGetUserData = false;
        state.fetchGetUserDataMsg = action.payload.message;
        state.isAuth = false;
        state.userData = null;
      })

      .addCase(loginAction.pending, (state, action) => {
        state.isLogin = true;
        state.isAuth = false;
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.isLogin = false;
        state.isAuth = true;
        state.accessToken = action.payload.data.token;
        cookie.set('accessToken', action.payload.data.token);
      })
      .addCase(loginAction.rejected, (state, action) => {
        state.isLogin = false;
        state.isAuth = false;
        state.loginMsg = action.payload.message;
      })

      .addCase(registerAction.pending, (state, action) => {
        state.isRegister = true;
        state.isAuth = false;
      })
      .addCase(registerAction.fulfilled, (state, action) => {
        state.isRegister = false;
        state.isAuth = true;
        state.accessToken = action.payload.data.token;
      })
      .addCase(registerAction.rejected, (state, action) => {
        state.isAuth = false;
        state.registerMsg = action.payload.message;
      });
  },
});

export const selectUserData = (state) => state.authen.userData;
export const selectIsAuth = (state) => state.authen.isAuth;
export const { logout } = authenSlice.actions;

export default authenSlice.reducer;
