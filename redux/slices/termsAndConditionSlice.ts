import { getCookie } from "@/lib/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const TermsSlice = createApi({
  reducerPath: "TermsSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL,
    prepareHeaders: (headers) => {
      const token = getCookie("token");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    postTerms: builder.mutation({
      query: (data) => ({
        url: "/html-content/terms",
        method: "POST",
        body: data,
      }),
    }),

    getTerms: builder.query({
      query: (type: string) => ({
        url: `/html-content/${type}`,
      }),
    }),
  }),
});

export const { usePostTermsMutation, useGetTermsQuery } = TermsSlice;
