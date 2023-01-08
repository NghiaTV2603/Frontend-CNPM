import {createAsyncThunk, createSlice} from "@reduxjs/toolkit"
import axios from "axios";

export const hokhauSlice = createSlice({
  name: 'hokhau',
  initialState: [
    {
      sohokhau: 1,
      idchuho: 1,
      sonha: 1,
      duong: 'Nguyen Tuan',
      phuong: 'Trung Quan',
      quan: 'Ha Son',
      ngaylamhokhau: '14-12-12',
    },
    {
      sohokhau: 2,
      idchuho: 2,
      sonha: 2,
      duong: 'Nguyen An Ninh',
      phuong: 'Nguyen An Ninh',
      quan: 'Tuong mai',
      ngaylamhokhau: '12-32-12',
    },
    {
      sohokhau: 3,
      idchuho: 2,
      sonha: 2,
      duong: 'Nguyen An Ninh',
      phuong: 'Nguyen An Ninh',
      quan: 'Tuong mai',
      ngaylamhokhau: '12-32-12',
    },
    {
      sohokhau: 4,
      idchuho: 2,
      sonha: 2,
      duong: 'Nguyen An Ninh',
      phuong: 'Nguyen An Ninh',
      quan: 'Tuong mai',
      ngaylamhokhau: '12-32-12',
    },
    {
      sohokhau: 5,
      idchuho: 2,
      sonha: 2,
      duong: 'Nguyen An Ninh',
      phuong: 'Nguyen An Ninh',
      quan: 'Tuong mai',
      ngaylamhokhau: '12-32-12',
    },
    {
      sohokhau: 6,
      idchuho: 2,
      sonha: 2,
      duong: 'Nguyen An Ninh',
      phuong: 'Nguyen An Ninh',
      quan: 'Tuong mai',
      ngaylamhokhau: '12-32-12',
    },
    {
      sohokhau: 7,
      idchuho: 2,
      sonha: 2,
      duong: 'Nguyen An Ninh',
      phuong: 'Nguyen An Ninh',
      quan: 'Tuong mai',
      ngaylamhokhau: '12-32-12',
    },
    {
      sohokhau: 8,
      idchuho: 2,
      sonha: 2,
      duong: 'Nguyen An Ninh',
      phuong: 'Nguyen An Ninh',
      quan: 'Tuong mai',
      ngaylamhokhau: '12-32-12',
    },
    {
      sohokhau: 9,
      idchuho: 2,
      sonha: 2,
      duong: 'Nguyen An Ninh',
      phuong: 'Nguyen An Ninh',
      quan: 'Tuong mai',
      ngaylamhokhau: '12-32-12',
    },
  ],
  reducers:{
    addHokhau: (state,action) => {
      state.push(action.payload)
    }
  },
  extraReducers: builder => {
    builder.addCase(fetchHokhau.pending,(state, action)=>{
      state.status = 'loading';
    })
    builder.addCase((fetchHokhau.fulfilled),(state, action)=>{
      state.hokhau = action.payload;
    })
  }
});
const api = axios.create({
  baseURL: 'api'
})
export const fetchHokhau = createAsyncThunk("hokhau/fetchHokhau", async ()=>{
  const data = await api.get('/hokhau');
  return data.data;
})
