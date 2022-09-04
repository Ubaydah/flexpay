import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./shared";

export const walletApi = createApi({
  reducerPath: "walletApi",
  baseQuery: baseQueryWithReauth,
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
  }),
});

export const { useExchangeCurrencyMutation } = walletApi;
