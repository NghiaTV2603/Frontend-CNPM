import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const nhankhauSlice = createSlice({
  name: 'nhanhkhau',
  initialState: [
    {
      sohokhau: 1,
      hoten: 'Nghia Tran',
      cccd: 12341241233,
      ngaysinh: '26-03-01',
      nghenghiep: 'Sinh Vien',
      gioitinh: 'Nam',
      quequan: 'Nghe An',
    },
    {
      sohokhau: 2,
      hoten: 'Nghia Tran',
      cccd: 12341241233,
      ngaysinh: '26-03-01',
      nghenghiep: 'Sinh Vien',
      gioitinh: 'Nam',
      quequan: 'Nghe An',
    },
    {
      sohokhau: 3,
      hoten: 'Nghia Tran',
      cccd: 12341241233,
      ngaysinh: '26-03-01',
      nghenghiep: 'Sinh Vien',
      gioitinh: 'Nam',
      quequan: 'Nghe An',
    },
    {
      sohokhau: 4,
      hoten: 'Nghia Tran',
      cccd: 12341241233,
      ngaysinh: '26-03-01',
      nghenghiep: 'Sinh Vien',
      gioitinh: 'Nam',
      quequan: 'Nghe An',
    },
  ],
  reducers: {
    addNhankhau: (state, action) => {
      state.push(action.payload);
    }
  },
})
const api = axios.create({
  baseURL: 'api'
})
export const fetchNhankhau = createAsyncThunk("nhankhau/fetchNhankhau", async () => {
  const data = await api.get('/nhankhau');
  return data.data
})
