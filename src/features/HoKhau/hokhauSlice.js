import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const hokhauSlice = createSlice({
  name:'hokhau',
  initialState: {
    listHokhau : [] ,
    status : null ,
    message : null,
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
      if(action.payload.code === 500){
        state.message = "Chủ hộ đã tồn tại trong hộ khẩu khác"
        state.status = 'error'
      }else if (action.payload.code === 404){
        state.message = "Chủ hộ không tồn tại"
        state.status = 'error'
      } else{
        state.message = "Thêm chủ hộ thành công"
        state.listHokhau.push(action.payload.data)
      }
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

export const fetchAddHokhau = createAsyncThunk("hokhau/fetchAddHokhau",async (data)=>{
  const res = await api.get(`addHokhau?token=${data.token}`,{params:data.dataHokhau})
  return res.data;
})


export default hokhauSlice
