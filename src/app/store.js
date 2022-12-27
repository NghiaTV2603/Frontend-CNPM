import { configureStore } from '@reduxjs/toolkit';

import themeReducer from 'src/features/theme/themeSlice';
import { hokhauSlice } from "../features/HoKhau/hokhauSlice";
import { nhankhauSlice } from "../features/NhanKhau/nhankhauSlice";
export const store = configureStore({
  reducer: {
    theme: themeReducer,
    hokhau: hokhauSlice.reducer,
    nhankhau: nhankhauSlice.reducer,
  },
});
