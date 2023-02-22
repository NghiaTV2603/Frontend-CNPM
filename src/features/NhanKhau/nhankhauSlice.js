import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";
export const nhankhauSlice = createSlice({
  name: 'nhanhkhau',
  initialState: {
    listNhankhau: [],
    status: null,
    message: null,
    currentListNhankhau: [],
  },
  reducers: {
    resetCurrentListNhankhau : (state, action) => {
      state.currentListNhankhau = [];
      state.status = null;
      state.message = null
    },
    resetStatus : (state, action) => {
      state.status = null
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchNhankhau.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchNhankhau.fulfilled, (state, action) => {
      state.status = null;
      state.listNhankhau = action.payload;
    })
    builder.addCase(fetchAddNhankhau.fulfilled, (state, action) => {
      const res = action.payload;
      if (res.code === 500) {
        if (res.message === "Failed") {
          state.message = "Hộ khẩu không tồn tại"
          state.status = 'error'
        } else {
          state.message = "Căn cước công dân đã tồn tại"
          state.status = 'error'
        }
      } else {
        state.message = "Thêm nhân khẩu thành công"
        state.status = "Success"
        state.listNhankhau.push(action.payload.data);
      }
    })
    builder.addCase(fetchDeleteNhankhau.fulfilled, (state, action) => {
      state.message = "Xóa nhân khẩu thành công"
      state.listNhankhau = state.listNhankhau.filter(obj => obj.id.toString() !== action.payload.idnhankhau)
      state.currentListNhankhau = state.currentListNhankhau.filter(obj => obj.id.toString() !== action.payload.idnhankhau)
    })
    builder.addCase(fetchCurrentListNhanKhau.pending,(state, action)=>{
      state.status = "loading current"
    })
    builder.addCase(fetchCurrentListNhanKhau.fulfilled,(state, action)=>{
      state.status = null
      state.currentListNhankhau = action.payload
    })
    builder.addCase(fetchUpdateNhankhau.fulfilled,(state, action)=>{
      if(action.payload.code === 200){
        state.status = "success update"
        state.listNhankhau = state.listNhankhau.map(obj => obj.id.toString() === action.payload.data.id ? action.payload.data : obj);
        state.currentListNhankhau = state.currentListNhankhau.map(obj => obj.id.toString() === action.payload.data.id ? action.payload.data : obj);
      }else{
        state.status = "error update"
      }
    })
    builder.addCase(fetchSearchNhankhau.pending,(state, action)=>{
      state.status = 'loading'
    })
    builder.addCase(fetchSearchNhankhau.fulfilled,(state, action)=>{
      state.status = null
      state.listNhankhau = action.payload
    })
  }
})
const api = axios.create({
  baseURL: 'https://different-mite-robe.cyclic.app/'
})
export const fetchNhankhau = createAsyncThunk("nhankhau/fetchNhankhau", async (token) => {
  const data = await api.get(`getListNhankhau?token=${token}`);
  return data.data.data
})

export const fetchAddNhankhau = createAsyncThunk("nhankhau/fetchAddNhankhau", async (data) => {
  const res = await api.get(`addNhankhau?token=${data.token}`, {params: data.data})
  return res.data
})

export const fetchDeleteNhankhau = createAsyncThunk("hokhau/fetchDeleteNhankhau", async (data) => {
  const res = await api.get(`deleteNhankhau?token=${data.token}&idnhankhau=${data.id}`)
  console.log(res.data.data)
  return res.data.data;
})

export const fetchCurrentListNhanKhau = createAsyncThunk("nhankhau/fetchCurrentListNhanKhau", async (data) => {
  const res = await api.get(`getListNhankhauBySoHoKhau?token=${data.token}&sohokhau=${data.id}`)
  return res.data.data
})

export const fetchUpdateNhankhau = createAsyncThunk("nhanhkhau/fetchUpdateNhankhau" , async (data)=>{
  const res = await api.get(`updateNhankhau?token=${data.token}&idnhankhau=${data.idnhankhau}`,{params:data.data})
  return res.data
})

export const fetchSearchNhankhau = createAsyncThunk("nhankhau/fetchSearchNhankhau", async (data)=>{
  const res = await api.get(`searchNhankhau?token=${data.token}`,{params:data.data})
  return res.data.data
})
