import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const nhankhauSlice = createSlice({
  name: 'nhanhkhau',
  initialState:{
    listNhankhau : [],
    status : null
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchNhankhau.pending,(state, action)=>{
      state.status = 'loading'
    })
    builder.addCase(fetchNhankhau.fulfilled,(state, action)=>{
      state.status = null ;
      state.listNhankhau = action.payload ;
    })
  }
})
const api = axios.create({
  baseURL: 'http://localhost:3000'
})
export const fetchNhankhau = createAsyncThunk("nhankhau/fetchNhankhau", async (token) => {
  const data = await api.get(`getListNhankhau?token=${token}`);
  return data.data.data
})
