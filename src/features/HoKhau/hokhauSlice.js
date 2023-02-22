import {createSlice,createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const hokhauSlice = createSlice({
  name:'hokhau',
  initialState: {
    listHokhau : [] ,
    status : null ,
    message : null,
    currentHokhau : [],
    currentHistory : [],
  },
  reducers: {
    resetCurrentHokhau : (state, action)=>{
      state.currentHokhau = []
    },
    resetCurrenHistory : (state, action)=>{
      state.currentHistory = []
    }

  },
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
        state.status = "Success"
        state.message = "Thêm chủ hộ thành công"
        state.listHokhau.push(action.payload.data)
      }
    })
    builder.addCase(fetchDeleteHokhau.fulfilled,(state, action)=>{
      state.listHokhau = state.listHokhau.filter(obj => obj.cccdchuho !== action.payload.cccd)
      state.message = "Xóa nhân khẩu thành công"
    })
    builder.addCase(fetchCurrentHokhau.fulfilled,(state, action)=>{
      state.currentHokhau = action.payload
    })
    builder.addCase(fetchUpdateHokhau.fulfilled,(state, action)=>{
      state.status = "success updatehokhau"
      state.listHokhau = state.listHokhau.map(obj => obj.sohokhau === action.payload.sohokhau ? action.payload : obj);
    })
    builder.addCase(fetchHistory.pending,(state, action)=>{
      state.status = "loading history"
    })
    builder.addCase(fetchHistory.fulfilled,(state, action)=>{
      state.status = null
      state.currentHistory = action.payload
    })
  }
})

const api = axios.create({
  baseURL: 'https://different-mite-robe.cyclic.app/'
})

export const fetchListHokhau = createAsyncThunk("hokhau/fetchListHokhau", async (token1)=>{
  const res = await api.get(`getListHokhau?token=${token1}`)
  return res.data.data ;
})

export const fetchAddHokhau = createAsyncThunk("hokhau/fetchAddHokhau",async (data)=>{
  const res = await api.get(`addHokhau?token=${data.token}`,{params:data.dataHokhau})
  return res.data;
})

export const fetchDeleteHokhau = createAsyncThunk ("hokhau/fetchDeleteHokhau",async (data)=>{
  const res = await api.get(`deleteHokhauByCccd?token=${data.token}&cccd=${data.cccd}`)
  return res.data.data;
})

export const fetchCurrentHokhau = createAsyncThunk("hokhau/fetchCurrentHokhau",async (data) => {
  const res = await api.get(`getListNhankhauBySoHoKhau?token=${data.token}&sohokhau=${data.id}`)
  return res.data.data
})

export const fetchUpdateHokhau = createAsyncThunk("hokhau/fetchUpdateHokhau" , async (data) => {
  const res = await api.get(`updateHokhau?token=${data.token}`,{params:data.data})
  return res.data.data
})

export const fetchHistory = createAsyncThunk("hokhau/fetchHistory", async (data) =>{
  const res = await api.get(`getHokhauHistory?token=${data.token}&sohokhau=${data.sohokhau}`)
  return res.data.data
})


export default hokhauSlice
