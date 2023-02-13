import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const nhankhauSlice = createSlice({
  name: 'nhanhkhau',
  initialState: {
    listNhankhau: [],
    status: null,
    message: null,
  },
  reducers: {},
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
      builder.addCase(fetchDeleteNhankhau.fulfilled,(state, action)=>{
        state.message = "Xóa nhân khẩu thành công"
        state.listNhankhau = state.listNhankhau.filter(obj => obj.id.toString() !== action.payload.idnhankhau)
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

export const fetchAddNhankhau = createAsyncThunk("nhankhau/fetchAddNhankhau", async (data) => {
  const res = await api.get(`addNhankhau?token=${data.token}`, {params: data.data})
  return res.data
})

export const fetchDeleteNhankhau = createAsyncThunk ("hokhau/fetchDeleteNhankhau",async (data)=>{
  const res = await api.get(`deleteNhankhau?token=${data.token}&idnhankhau=${data.id}`)
  console.log(res.data.data)
  return res.data.data;
})
