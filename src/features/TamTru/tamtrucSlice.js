import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const tamtrucSlice = createSlice({
  name: 'tamtru',
  initialState: {
    status: null,
    message: null,
    listTamtru: [],
  },
  reducers: {},
  extraReducers: builder => {
    builder.addCase(fetchListTamtru.pending, (state, action) => {
      state.status = 'loading'
    })
    builder.addCase(fetchListTamtru.fulfilled, (state, action) => {
      state.status = null;
      state.listTamtru = action.payload
    })
    builder.addCase(fetchAddTamtru.fulfilled, (state, action) => {
      if (action.payload.code === 200) {
        state.status = "success add"
        state.listTamtru.push(action.payload.data)
      } else {
        if (action.payload.code === 404) {
          state.status = "error"
          state.message = "Căn cước công dân không tồn tại"
        } else {
          state.status = "error"
          state.message = "Đã tồn tại"
        }
      }
    })
    builder.addCase(fetchDeleteTamtru.fulfilled, (state, action) => {
      state.status = "Xóa tamtru"
      state.listTamtru = state.listTamtru.filter(obj => obj.id.toString() !== action.payload.id)
    })
    builder.addCase(fetchUpdateTamtru.fulfilled, (state, action) => {
      if (action.payload.code === 200) {
        state.status = "success update"
        state.listTamtru = state.listTamtru.map(obj => obj.id.toString() === action.payload.data.id ? action.payload.data : obj);
      }
    })
  },
})

const api = axios.create({
  baseURL: 'http://localhost:3000'
})

export const fetchListTamtru = createAsyncThunk("tamtru/fetchListTamtru", async (token) => {
  const res = await api.get(`getListTamtrutamvang?token=${token}`)
  return res.data.data
})

export const fetchAddTamtru = createAsyncThunk("tamtru/fetchAddTamtru", async (data) => {
  const res = await api.get(`addTamtrutamvang?token=${data.token}`, {params: data.data})
  return res.data
})

export const fetchDeleteTamtru = createAsyncThunk("tamtru/fetchDeleteTamtru", async (data) => {
  const res = await api.get(`deleteTamtrutamvang?token=${data.token}&id=${data.id}`)
  return res.data.data
})

export const fetchUpdateTamtru = createAsyncThunk("tamtru/fetchUpdateTamtru", async (data) => {
  const res = await api.get(`updateTamtruvang?token=${data.token}`, {params: data.data})
  return res.data
})

export default tamtrucSlice



