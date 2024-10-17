import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    credentials: "include",
  }),
  endpoints: (builder) => ({
    getComments: builder.query({
      query: () => ({
        url: "/comment/total-comments",
        method: "GET",
      }),
    }),
    postComment: builder.mutation({
      query: (commentData) => ({
        url: "/comment/post-comment",
        method: "POST",
        body: commentData,
      }),
      invalidatesTags: (result, error, { postId }) => [
        { type: "Comments", id: postId },
      ],
    }),
  }),
});

export const { useGetCommentsQuery, usePostCommentMutation } = commentApi;
