import { getCookie } from "@/lib/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userSlice = createApi({
  reducerPath: "userSlice",
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
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query({
      query: () => ({
        url: "/user",
      }),
      providesTags: ["Users"],
    }),

    getUserbyId: builder.query({
      query: (id: string) => ({
        url: `/user/${id}`,
      }),
      providesTags: ["Users"],
    }),

    activateUser: builder.mutation({
      query: (id: string) => ({
        url: `/user/${id}/status/activate`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),

    deactivateUser: builder.mutation({
      query: (id: string) => ({
        url: `/user/${id}/status/deactivate`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),

    banUser: builder.mutation({
      query: (id: string) => ({
        url: `/user/${id}/status/ban`,
        method: "PATCH",
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useGetUsersQuery,
  useGetUserbyIdQuery,
  useActivateUserMutation,
  useDeactivateUserMutation,
  useBanUserMutation,
} = userSlice;
