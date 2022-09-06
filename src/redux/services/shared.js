import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const { REACT_APP_BACKEND_API } = process.env;

const baseUrl = `${REACT_APP_BACKEND_API}/`;

export const baseQueryWithoutHeader = fetchBaseQuery({
  baseUrl: baseUrl,
});

export const baseQuery = fetchBaseQuery({
  baseUrl: baseUrl,
  prepareHeaders: (headers, { getState }) => {
    const authorization = getState().authStore.authorization;
    if (authorization?.access) {
      headers.set("authorization", `Bearer ${authorization?.access}`);
    }
    return headers;
  },
});

export const createRequest = (url) => ({ url });
export const createRequestWithParams = (url, params) => ({ url, params: params });
