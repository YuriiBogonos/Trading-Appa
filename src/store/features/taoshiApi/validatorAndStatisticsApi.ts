import { Root } from '@/types/types.ts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const validatorApi = createApi({
  reducerPath: 'validatorApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://request.wildsage.io',
  }),
  endpoints: (builder) => ({
    fetchValidator: builder.query<Root, void>({
      query: () => ({
        url: '/validator-checkpoint',
        headers: {
          'x-taoshi-consumer-request-key': 'req_3ZdFcDTkY8PDp3wzMARLVQ1h',
        },
      }),
    }),
    fetchStatistics: builder.query<Root, void>({
      query: () => ({
        url: '/statistics',
        headers: {
          'x-statistics-request-key': 'req_3Zntc9v2x8nCnqwYBUeBHdft',
        },
      }),
    }),
  }),
});

export const { useFetchValidatorQuery, useFetchStatisticsQuery } = validatorApi;
