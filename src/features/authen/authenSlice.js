import {createSlice , createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";
import {hideLoadingModal,showLoadingModal} from "src/helpers/modal.helper";

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
      showLoadingModal();
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
      hideLoadingModal();
    })
    builder.addCase(fetchLogin.rejected,(state, action)=>{
      state.status = 'Đăng nhập thất bại'
    })
  }
})

const api = axios.create({
  baseURL: 'https://different-mite-robe.cyclic.app/'
})

export const fetchLogin = createAsyncThunk ("authen/login", async (data) => {
  const res = await api.get('login',{params: data})
  return res.data ;
})


export default authenSlice;





