import { configureStore } from '@reduxjs/toolkit';

import themeReducer from 'src/features/theme/themeSlice';
import hokhauSlice from "src/features/HoKhau/hokhauSlice";
import { nhankhauSlice } from "../features/NhanKhau/nhankhauSlice";
import authenSlice from "src/features/authen/authenSlice";
import khoanthuSlice from "src/features/DanhSachDongTien/khoanthuSlice";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    hokhau: hokhauSlice.reducer,
    nhankhau: nhankhauSlice.reducer,
    authen : authenSlice.reducer,
    khoanthu : khoanthuSlice.reducer
  },
});


