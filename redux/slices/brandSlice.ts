import { getCookie } from "@/lib/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const brandSlice = createApi({
  reducerPath: "brandSlice",
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
  tagTypes: ["Brands"],
  endpoints: (builder) => ({
    getBrands: builder.query({
      query: () => ({
        url: "/brand",
      }),
      providesTags: ["Brands"],
    }),

    getBrandById: builder.query({
      query: (id) => ({
        url: `/brand/${id}`,
      }),
      providesTags: ["Brands"],
    }),

    postBrand: builder.mutation({
      query: (data) => ({
        url: "/brand",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Brands"],
    }),

    updateBrand: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/brand/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Brands"],
    }),

    deleteBrand: builder.mutation({
      query: (id) => ({
        url: `/brand/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Brands"],
    }),
  }),
});

export const {
  useGetBrandsQuery,
  useGetBrandByIdQuery,
  usePostBrandMutation,
  useUpdateBrandMutation,
  useDeleteBrandMutation,
} = brandSlice;
