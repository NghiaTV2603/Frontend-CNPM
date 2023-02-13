import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const authenSlice = createSlice({
  name: 'authen',
  initialState: {
    isLogin : false ,
    status : null,
    userData : null,
    accessToken: null,
  },
  reducers : {
    logout : (state, action) => {
      state.isLogin  = false;
      state.status = null ;
      state.userData = null;
      state.accessToken = null;
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchLogin.pending,(state,action)=>{
      state.status = 'loading';
    })
    builder.addCase(fetchLogin.fulfilled,(state, action)=>{
      if(action.payload.code === 200){
      state.status = null ;
      state.userData = action.payload.data.user;
      state.isLogin = true ;
      state.accessToken = action.payload.data.token;
      }else{
        state.status = 'error'
      }
    })
    builder.addCase(fetchLogin.rejected,(state, action)=>{
      state.status = 'Đăng nhập thất bại'
    })
  }
})

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

export const fetchLogin = createAsyncThunk ("authen/login", async (data) => {
  const res = await api.get('login',{params: data})
  return res.data ;
})


export default authenSlice;





