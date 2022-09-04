import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithoutHeader } from "./shared";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: baseQueryWithoutHeader,
  endpoints: (builder) => ({
    registerCompany: builder.mutation({
      query: (data) => {
        return {
          url: `/auth/company`,
          method: "post",
          body: data,
        };
      },
    }),
    loginCompany: builder.mutation({
      query: (data) => {
        return {
          url: `auth/company/login`,
          method: "post",
          body: data,
        };
      },
    }),
  }),
});

export const { useRegisterCompanyMutation, useLoginCompanyMutation } = authApi;
