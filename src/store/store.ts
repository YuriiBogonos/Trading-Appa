import { configureStore } from '@reduxjs/toolkit';

import { taoshiApi } from './features/taoshiApi/taoshiApi.ts';
import { tradeApi } from './features/trades/tradesSlice.ts';

export const store = configureStore({
  reducer: {
    [tradeApi.reducerPath]: tradeApi.reducer,
    [taoshiApi.reducerPath]: taoshiApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tradeApi.middleware).concat(taoshiApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
