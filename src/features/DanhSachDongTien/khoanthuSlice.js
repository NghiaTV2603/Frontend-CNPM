import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const khoanthuSlice = createSlice({
  name:'khoanthu',
  initialState:{
    listKhoanthu : [],
    status : null,
    currentKhoanThu : [],
  },
  reducers:{},
  extraReducers:builder => {
    builder.addCase(fetchListKhoanthu.pending,(state, action)=>{
      state.status = "loading"
    })
    builder.addCase(fetchListKhoanthu.fulfilled,(state, action)=>{
      state.status= null
      state.listKhoanthu = action.payload
    })
    builder.addCase(fetchListThuphi.pending,(state, action)=>{
      state.status = "loading"
    })
    builder.addCase(fetchListThuphi.fulfilled,(state, action)=>{
      state.status = null
      state.currentKhoanThu = action.payload
    })
  }
})

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

export const fetchListKhoanthu = createAsyncThunk("khoanthu/fetchListKhoanthu", async (token) =>{
  const res = await api.get(`getListKhoanthu?token=${token}`)
  return res.data.data
})

export const fetchListThuphi = createAsyncThunk("khoanthu/fetchListThuphi",async (data) =>{
  const res = await api.get(`getListThuphi?token=${data.token}&idkhoanthu=${data.id}`)
  console.log("[log thu phi : ]"  + res.data.data)
  return res.data.data
})

export default khoanthuSlice
