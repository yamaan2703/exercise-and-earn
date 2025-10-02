import { getCookie } from "@/lib/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const goalSlice = createApi({
  reducerPath: "goalSlice",
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
  tagTypes: ["Goals"],
  endpoints: (builder) => ({
    getGoals: builder.query({
      query: () => ({
        url: "/goal",
      }),
      providesTags: ["Goals"],
    }),

    postGoals: builder.mutation({
      query: (data) => ({
        url: "/goal",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Goals"],
    }),
  }),
});

export const { useGetGoalsQuery, usePostGoalsMutation } = goalSlice;
