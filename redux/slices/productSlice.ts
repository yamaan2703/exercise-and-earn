import { getCookie } from "@/lib/cookies";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productSlice = createApi({
  reducerPath: "productSlice",
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
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: "/product",
      }),
      providesTags: ["Product"],
    }),

    getProductbyId: builder.query({
      query: (id: number) => ({
        url: `/product/${id}`,
      }),
      providesTags: ["Product"],
    }),

    addProducts: builder.mutation({
      query: (data) => ({
        url: "/product",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    updateProduct: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `/product/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProduct: builder.mutation({
      query: (id: number) => ({
        url: `/product/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),

    addProductImages: builder.mutation({
      query: ({ id, images }) => ({
        url: `/product/${id}/images`,
        method: "POST",
        body: { images },
      }),
      invalidatesTags: ["Product"],
    }),

    deleteProductImages: builder.mutation({
      query: ({ id, images }) => ({
        url: `/product/${id}/images`,
        method: "DELETE",
        body: { images },
      }),
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useGetProductsQuery,
  useGetProductbyIdQuery,
  useAddProductsMutation,
  useUpdateProductMutation,
  useDeleteProductMutation,
  useAddProductImagesMutation,
  useDeleteProductImagesMutation,
} = productSlice;
