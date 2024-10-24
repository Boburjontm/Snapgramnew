// productApi.ts
import { api } from "../api/index";

export const productApi = api.injectEndpoints({
  endpoints: (build) => ({
    createUser: build.mutation({
      query: (body) => ({
        url: "/api/auth/register",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    loginUser: build.mutation({
      query: (body) => ({
        url: "/api/auth/login",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    getUser: build.query({
      query: (name) => ({
        url: `/api/user/profile/${name}`,
      }),
      providesTags: ["User"],
    }),
    getAllUser: build.query({
      query: () => ({
        url: "/api/user/all",
      }),
      providesTags: ["User"],
    }),
    follow: build.mutation({
      query: (username) => ({
        url: `/api/user/follow/${username}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    unfollow: build.mutation({
      query: (username) => ({
        url: `/api/user/unfollow/${username}`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    getFeed: build.query({
      query: () => ({
        url: "/api/user/feed?limit=3000",
      }),
      providesTags: ["User"],
    }),
    createPost: build.mutation({
      query: (body) => ({
        url: "/api/post",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    uploadFiles: build.mutation({
      query: (body) => ({
        url: "/api/upload/files",
        method: "POST",
        body,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
     getUserName: build.query({
      query: (username) => ({
        url: `/api/user/profile/${username}`,
      }),
      providesTags: [{ type: 'User' }],
  
  }),
   getAllPosts: build.query({
    query: (username) => ({
      url: `/api/post/${username}`,
    }),
    providesTags: [{ type: 'User' }],
  }),
   


  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useGetUserQuery,
  useGetAllUserQuery,
  useFollowMutation,
  useUnfollowMutation,
  useGetFeedQuery,
  useCreatePostMutation,
  useUploadFilesMutation,
  useGetUserNameQuery,
  useGetAllPostsQuery
  
} = productApi;
