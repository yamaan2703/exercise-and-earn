import { getCookie } from "@/lib/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const PrivacySlice = createApi({
  reducerPath: "PrivacySlice",
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
    postPrivacy: builder.mutation({
      query: (data) => ({
        url: "/html-content/privacy",
        method: "POST",
        body: data,
      }),
    }),

    getPrivacy: builder.query({
      query: (type: string) => ({
        url: `/html-content/${type}`,
      }),
    }),
  }),
});

export const { usePostPrivacyMutation, useGetPrivacyQuery } = PrivacySlice;
