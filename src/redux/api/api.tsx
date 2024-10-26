import { api } from "./index";

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
        url: "/api/user/all?limit=1000",
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
      providesTags: [{ type: "User" }],
    }),
    getAllPosts: build.query({
      query: (username) => ({
        url: `/api/post/${username}`,
      }),
      providesTags: [{ type: "User" }],
    }),
    getUserProduct: build.query({
      query: (username) => ({
        url: `/api/user/profile/${username}`,
      }),
      providesTags: ["User"],
    }),
    getUserPosts: build.query({
      query: (username) => ({
        url: `/api/post/${username}`,
      }),
      providesTags: [{ type: "User" }],
    }),
    getUserImages: build.query({
      query: (username) => ({
        url: `/api/user/images/${username}`, // Your API endpoint
      }),
      providesTags: [{ type: "User" }],
    }),
    // New endpoint for getting current user data
    getCurrentUserData: build.query({
      query: () => ({
        url: "/api/user/current", // Your API endpoint to get current user data
      }),
      providesTags: ["User"],
    }),
    // New endpoint for updating user details
    updateUser: build.mutation({
      query: (body) => ({
        url: "/api/user/update", // Your API endpoint for updating user details
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    likePost: build.mutation({
      query: (username) => ({
        url: `/api/post/${username}/like`,
        method: "POST",
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    getCurrentUserDatas: build.query({
      query: () => ({
        url: "/api/user/profile",
      }),
      providesTags: [{ type: "User" }],
    }),
  }),
});

// Export hooks
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
  useGetAllPostsQuery,
  useGetUserProductQuery,
  useGetUserPostsQuery,
  useGetUserImagesQuery,
  useGetCurrentUserDataQuery,  
  useLikePostMutation,
  useUpdateUserMutation, 
  useGetCurrentUserDatasQuery,
} = productApi;
