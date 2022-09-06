import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, createRequest } from "./shared";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: baseQuery,
  tagTypes: ["wallet"],
  endpoints: (builder) => ({
    exchangeCurrency: builder.mutation({
      query: (data) => {
        return {
          url: `/wallet/exchange`,
          method: "post",
          body: data,
        };
      },
    }),
    fundWallet: builder.mutation({
      query: (data) => {
        return {
          url: `/wallet/deposit`,
          method: "post",
          body: data,
        };
      },
      invalidatesTags: ["wallet"],
    }),
    getWallet: builder.query({
      query: () => createRequest(`wallet/details`),
      providesTags: (_result, _error, id) => [{ type: "wallet", id }],
    }),
  }),
});

export const { useExchangeCurrencyMutation, useFundWalletMutation, useGetWalletQuery } = walletApi;
