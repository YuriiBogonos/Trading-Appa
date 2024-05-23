import { TradeRequest, TradeResponse, TradeStatus } from '@/types/types.ts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tradeApi = createApi({
  reducerPath: 'tradeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://34.253.69.53:8000/' }),
  endpoints: (builder) => ({
    openTrade: builder.mutation<TradeResponse, TradeRequest>({
      query: (tradeData) => ({
        url: 'initiate-trade/',
        method: 'POST',
        body: tradeData,
      }),
    }),
    fetchTradeStatus: builder.query<TradeStatus, string>({
      query: (sessionId) => ({
        url: `check-trade-status/${sessionId}`,
        method: 'GET',
      }),
    }),
  }),
});

export const { useOpenTradeMutation, useFetchTradeStatusQuery } = tradeApi;
