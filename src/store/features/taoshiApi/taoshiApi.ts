import { Root } from '@/types/types.ts';
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3MTgxNDIyMzgsImlhdCI6MTcxNTU1MDIzOH0.-wSAnByWBEyC3pvgmBENbvd0aPrnAqSR4Dc562Nwmmc';

export const taoshiApi = createApi({
  reducerPath: 'taoshiApi',
  baseQuery: fetchBaseQuery({
    baseUrl: `https://qt19xslq0s9769-8888.proxy.runpod.net`,
  }),
  endpoints: (builder) => ({
    fetchLink: builder.query<Root, void>({
      query: () => `/download?token=${token}`,
    }),
  }),
});

export const { useFetchLinkQuery } = taoshiApi;
