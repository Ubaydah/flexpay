import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Mutex } from "async-mutex";

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

const mutex = new Mutex();

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  await mutex.waitForUnlock();
  let result = await baseQuery(args, api, extraOptions);
  if (result.error && result.error.status === 401) {
    if (!mutex.isLocked()) {
      const release = await mutex.acquire();
      try {
        // const response = await baseQuery("/refreshToken", api, extraOptions);
        // if (response.data) {
        //   //   api.dispatch(authRedux.setAllUserDetails(response.data));
        //   result = await baseQuery(args, api, extraOptions);
        // } else {
        //   //   api.dispatch(authRedux.logout());
        // }
      } finally {
        release();
      }
    } else {
      await mutex.waitForUnlock();
      result = await baseQuery(args, api, extraOptions);
    }
  }
  return result;
};

export const createRequest = (url) => ({ url });
export const createRequestWithParams = (url, params) => ({ url, params: params });
