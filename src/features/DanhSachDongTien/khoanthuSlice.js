import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const khoanthuSlice = createSlice({
  name:'khoanthu',
  initialState:{
    listKhoanthu : [],
    status : null,
    currentKhoanThu : [],
    message : null ,
  },
  reducers:{
    resetThuphi : (state, action) =>{
      state.currentKhoanThu = []
    }
  },
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
    builder.addCase(fetchAddKhoanthu.fulfilled,(state, action)=>{
      if(action.payload.code === 200){
      state.listKhoanthu.push(action.payload.data)
      state.status = "ok"
      }else{
        state.status = "error"
      }
    })
    builder.addCase(fetchDeleteKhoanthu.fulfilled,(state, action)=>{
      state.status = "delete"
      state.listKhoanthu = state.listKhoanthu.filter(obj => obj.id !== action.payload.id)
    })
    builder.addCase(fetchAddThuphi.fulfilled,(state, action)=>{
      if(action.payload.code === 500 ){
        if(action.payload.message === "khoanthu is not existed"){
          state.status = "error khoanthu"
        }else{
          state.status = "error sohokhau"
        }
      }else{
        state.status = "Success thuphi"
        state.currentKhoanThu.push(action.payload.data)
      }
    })
    builder.addCase(fetchDeleteThuphi.fulfilled,(state, action)=>{
      state.status = "delete thuphi"
      state.currentKhoanThu = state.currentKhoanThu.filter(obj => obj.id !== action.payload.id)
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
export const fetchAddKhoanthu = createAsyncThunk("khoanthu/fetchAddKhoanthu" , async (data) => {
  const res = await api.get(`addKhoanthu?token=${data.token}`,{params:data.data})
  return res.data
})
export const fetchDeleteKhoanthu = createAsyncThunk("khoanthu/fetchDeleteKhoanthu",async (data) => {
  const res = await api.get(`deleteKhoanthu?token=${data.token}&idkhoanthu=${data.id}`)
  return res.data.data
})

export const fetchListThuphi = createAsyncThunk("khoanthu/fetchListThuphi",async (data) =>{
  const res = await api.get(`getListThuphi?token=${data.token}&idkhoanthu=${data.id}`)
  return res.data.data
})

export const fetchAddThuphi = createAsyncThunk("khoanthu/fetchAddThuphi", async (data) => {
  const res = await api.get(`addThuphi?token=${data.token}`,{params : data.data})
  return res.data
})

export const fetchDeleteThuphi = createAsyncThunk("khoanthu/fetchDeleteThuphi" , async (data) => {
  const res = await api.get(`deleteThuphi?token=${data.token}&idthuphi=${data.id}`)
  return res.data.data
})



export default khoanthuSlice
