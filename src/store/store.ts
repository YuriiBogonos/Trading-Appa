import { configureStore } from '@reduxjs/toolkit';

import { validatorApi } from './features/taoshiApi/validatorAndStatisticsApi.ts';
import { tradeApi } from './features/trades/tradesSlice.ts';

export const store = configureStore({
  reducer: {
    [tradeApi.reducerPath]: tradeApi.reducer,
    [validatorApi.reducerPath]: validatorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tradeApi.middleware).concat(validatorApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
