import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://clntn-blogpost-api.onrender.com",
  prepareHeaders: (headers, { getState }) => {
    const {
      auth: { userInfo },
    } = getState();

    if (userInfo) {
      headers.set("Authorization", `Bearer ${userInfo.token}`);
    }

    return headers;
  },
});

export const apiSlice = createApi({
  baseQuery,
  tagTypes: ["Blog", "Users"],
  endpoints: (builder) => ({}),
});
