import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth, createRequest, createRequestWithParams } from "./shared";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: baseQueryWithReauth,
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
    withdrawFunds: builder.mutation({
      query: (data) => {
        return {
          url: `/wallet/withdrawal`,
          method: "post",
          body: data,
        };
      },
      invalidatesTags: ["wallet"],
    }),
    transferFunds: builder.mutation({
      query: (data) => {
        return {
          url: `/wallet/employee/transfer`,
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
    getTransactions: builder.query({
      query: (args) => createRequestWithParams(`wallet/transactions`, { page: args?.page }),
      providesTags: (_result, _error, id) => [{ type: "wallet", id }],
    }),
  }),
});

export const {
  useTransferFundsMutation,
  useExchangeCurrencyMutation,
  useFundWalletMutation,
  useGetWalletQuery,
  useWithdrawFundsMutation,
  useGetTransactionsQuery,
} = walletApi;
