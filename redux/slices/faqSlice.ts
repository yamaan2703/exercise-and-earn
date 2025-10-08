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
  tagTypes: ["Faqs"],
  endpoints: (builder) => ({
    getFaqs: builder.query({
      query: () => ({
        url: "/faq",
      }),
      providesTags: ["Faqs"],
    }),

    getFaqById: builder.query({
      query: (id) => ({
        url: `/faq/${id}`,
      }),
      providesTags: ["Faqs"],
    }),

    postFaq: builder.mutation({
      query: (data) => ({
        url: "/faq",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Faqs"],
    }),

    updateFaq: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/faq/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Faqs"],
    }),

    deleteFaq: builder.mutation({
      query: (id) => ({
        url: `/faq/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Faqs"],
    }),
  }),
});

export const { usePostFaqMutation, useGetFaqsQuery } = FaqSlice;
