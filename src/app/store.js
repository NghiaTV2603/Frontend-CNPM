import { configureStore } from '@reduxjs/toolkit';

import themeReducer from 'src/features/theme/themeSlice';

export const store = configureStore({
  reducer: {
    theme: themeReducer,
  },
});
