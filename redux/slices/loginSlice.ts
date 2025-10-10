import {
  BaseQueryFn,
  createApi,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { getCookie, setCookie } from "@/lib/cookies";
import { Routes } from "@/routes/Routes";

const baseQuery = fetchBaseQuery({
  baseUrl: process.env.NEXT_PUBLIC_API_URL,
  prepareHeaders: (headers) => {
    const token = getCookie("token");
    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  if (result.error && result.error.status === 401) {
    const currentToken = getCookie("token");

    if (currentToken) {
      const refreshResult = await baseQuery(
        {
          url: "/auth/refresh",
          method: "POST",
          body: { refreshToken: currentToken },
        },
        api,
        extraOptions
      );

      if (
        refreshResult.data &&
        (refreshResult.data as { token: string }).token
      ) {
        const newToken = (refreshResult.data as { token: string }).token;
        setCookie("token", newToken);

        result = await baseQuery(args, api, extraOptions);
      } else {
        setCookie("token", "");
        window.location.href = Routes.LOGIN;
      }
    } else {
      window.location.href = Routes.LOGIN;
    }
  }

  return result;
};

export const loginSlice = createApi({
  reducerPath: "loginSlice",
  baseQuery: baseQueryWithReauth,
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (data) => ({
        url: "/auth/admin",
        method: "POST",
        body: data,
      }),
    }),

    refreshToken: builder.mutation({
      query: (refreshToken) => ({
        url: "/auth/refresh",
        method: "POST",
        body: { refreshToken },
      }),
    }),
  }),
});

export const { useLoginMutation, useRefreshTokenMutation } = loginSlice;
