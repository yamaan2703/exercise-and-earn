import { getCookie } from "@/lib/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const FaqSlice = createApi({
  reducerPath: "FaqSlice",
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
    postFaq: builder.mutation({
      query: (data) => ({
        url: "/html-content/faq",
        method: "POST",
        body: data,
      }),
    }),

    getFaq: builder.query({
      query: (type: string) => ({
        url: `/html-content/${type}`,
      }),
    }),
  }),
});

export const { usePostFaqMutation, useGetFaqQuery } = FaqSlice;
