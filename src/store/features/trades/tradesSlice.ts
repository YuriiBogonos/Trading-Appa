import { NewPosition, TradeCloseRequest, TradeRequest, TradeResponse } from '@/types/types.ts';
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
    adjustTrade: builder.mutation<TradeResponse, TradeRequest>({
      query: (tradeData) => ({
        url: 'adjust-position',
        method: 'POST',
        body: tradeData,
      }),
    }),
    closeTrade: builder.mutation<TradeResponse, TradeCloseRequest>({
      query: (tradeData) => ({
        url: 'close-position',
        method: 'POST',
        body: tradeData,
      }),
    }),
    profitLoss: builder.mutation<void, TradeRequest>({
      query: (tradeData) => ({
        url: 'profit-loss',
        method: 'POST',
        body: tradeData,
      }),
    }),
    getAllPositions: builder.query<NewPosition[], void>({
      query: () => 'positions',
    }),
    getAllPositionsByTradePair: builder.query<NewPosition[], number | string>({
      query: (tradePair) => `positions/${tradePair}?only_open=true`,
    }),
  }),
});

export const {
  useOpenTradeMutation,
  useAdjustTradeMutation,
  useCloseTradeMutation,
  useGetAllPositionsByTradePairQuery,
  useGetAllPositionsQuery,
  useProfitLossMutation,
} = tradeApi;