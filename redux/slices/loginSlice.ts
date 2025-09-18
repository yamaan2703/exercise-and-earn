import { getCookie } from "../../lib/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const loginSlice = createApi({
  reducerPath: "loginSlice",
  baseQuery: fetchBaseQuery({
    prepareHeaders: (headers) => {
      const token = getCookie("verification-token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
  }),
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userData) => ({
        url: "/auth/signin",
        method: "POST",
        body: userData,
      }),
    }),
  }),
});

export const { useLoginMutation } = loginSlice;
