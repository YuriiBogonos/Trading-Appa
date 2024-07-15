import { TradeRequest, TradeResponse, TradeStatus } from '@/types/types.ts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const tradeApi = createApi({
  reducerPath: 'tradeApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://201.222.55.50:8000/trades/' }),
  endpoints: (builder) => ({
    openTrade: builder.mutation<TradeResponse, TradeRequest>({
      query: (tradeData) => ({
        url: 'initiate-position',
        method: 'POST',
        body: tradeData,
      }),
    }),
    fetchTradeStatus: builder.query<TradeStatus, string>({
      //TODO: Replase sessionId with tradeId
      query: (sessionId) => ({
        url: `positions/${sessionId}`,
        method: 'GET',
      }),
      transformResponse: (response: TradeStatus[]) => response[0],
    }),
  }),
});

export const { useOpenTradeMutation, useFetchTradeStatusQuery } = tradeApi;
