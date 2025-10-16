import { getCookie } from "@/lib/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const caloriesSlice = createApi({
  reducerPath: "caloriesSlice",
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
    getUserCaloriesById: builder.query({
      query: (id) => ({
        url: `/calories/user/${id}`,
      }),
    }),
  }),
});

export const { useGetUserCaloriesByIdQuery } = caloriesSlice;
