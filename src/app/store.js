import {combineReducers, configureStore} from '@reduxjs/toolkit';

import themeReducer from 'src/features/theme/themeSlice';
import hokhauSlice from "src/features/HoKhau/hokhauSlice";
import { nhankhauSlice } from "../features/NhanKhau/nhankhauSlice";
import authenSlice from "src/features/authen/authenSlice";
import khoanthuSlice from "src/features/DanhSachDongTien/khoanthuSlice";
import tamtrucSlice from "src/features/TamTru/tamtrucSlice";
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
const persistConfig = {
  key: 'root',
  version: 1,
  storage,
}

const rootReducer = combineReducers({
  theme: themeReducer,
  hokhau: hokhauSlice.reducer,
  nhankhau: nhankhauSlice.reducer,
  authen : authenSlice.reducer,
  khoanthu : khoanthuSlice.reducer,
  tamtru : tamtrucSlice.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

 export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export let persistor = persistStore(store)


