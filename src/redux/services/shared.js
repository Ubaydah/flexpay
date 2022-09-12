import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { isEmpty } from "lodash";
// import store from "../../redux/store";

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

export const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);
  const authorization = api.getState()?.authStore.authorization;
  if (result.error && result.error.status === 401 && !isEmpty(authorization?.access)) {
    localStorage.clear();
    sessionStorage.clear();
    window.location.replace("/");
  }
  return result;
};
export const createRequest = (url) => ({ url });
export const createRequestWithParams = (url, params) => ({ url, params: params });
