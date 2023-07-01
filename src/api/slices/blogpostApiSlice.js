import { apiSlice } from "./apiSlice";

const BLOGPOSTS_URL = "/api/blogposts";

export const blogpostsApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getBlogPosts: builder.query({
      query: () => BLOGPOSTS_URL,
      providesTags: ["Blog"],
    }),
    getBlogPost: builder.query({
      query: (id) => `${BLOGPOSTS_URL}/${id}`,
      providesTags: ["Blog"],
    }),
    createBlogPost: builder.mutation({
      query: (data) => ({
        url: BLOGPOSTS_URL,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),
    updateBlogPost: builder.mutation({
      query: ({ id, ...data }) => ({
        url: `${BLOGPOSTS_URL}/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["Blog"],
    }),
    deleteBlogPost: builder.mutation({
      query: (id) => ({
        url: `${BLOGPOSTS_URL}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Blog"],
    }),
  }),
});

export const {
  useGetBlogPostsQuery,
  useGetBlogPostQuery,
  useCreateBlogPostMutation,
  useUpdateBlogPostMutation,
  useDeleteBlogPostMutation,
} = blogpostsApiSlice;
