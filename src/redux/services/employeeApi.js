import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery, createRequest, createRequestWithParams } from "./shared";

export const employeeApi = createApi({
  reducerPath: "employeeApi",
  baseQuery: baseQuery,
  tagTypes: ["employees"],
  endpoints: (builder) => ({
    getEmployees: builder.query({
      query: (args) => createRequestWithParams(`auth/company/employee/all`, { page: args?.page, department: args?.department, search: args?.search }),
      providesTags: (result, _error, _arg) =>
        result?.data ? [...result?.data.map(({ id }) => ({ type: "employees", id })), "employees"] : ["employees"],
    }),

    getAnEmployee: builder.query({
      query: (id) => createRequest(`company/employee/${id}`),
      providesTags: (_result, _error, id) => [{ type: "employees", id }],
    }),

    addEmployee: builder.mutation({
      query: (data) => {
        return {
          url: `/auth/company/employee`,
          method: "post",
          body: data,
        };
      },
      invalidatesTags: ["employees"],
    }),
  }),
});

export const { useAddEmployeeMutation, useGetEmployeesQuery, useGetAnEmployeeQuery } = employeeApi;
