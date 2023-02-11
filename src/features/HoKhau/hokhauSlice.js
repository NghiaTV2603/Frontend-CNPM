import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const hokhauSlice = createSlice({
  name:'hokhau',
  initialState: {
    listHokhau : [] ,
    status : null ,
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchListHokhau.pending,(state, action)=>{
      state.status = 'loading'
    })
    builder.addCase(fetchListHokhau.fulfilled,(state, action)=>{
      state.status = null
      state.listHokhau = action.payload
    })
    builder.addCase(fetchAddHokhau.fulfilled,(state,action) => {
      state.listHokhau.push(action.payload);
    })
  }
})

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

export const fetchListHokhau = createAsyncThunk("hokhau/fetchListHokhau", async (token1)=>{
  const res = await api.get(`getListHokhau?token=${token1}`)
  console.log(token1)
  return res.data.data ;
})

export const fetchAddHokhau = createAsyncThunk("hokhau/fetchAddHokhau",async (token,data)=>{
  const res = await api.get(`addHokhau?token=${token}`,{params:data})
  return res.data.data();
})


export default hokhauSlice
