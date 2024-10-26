import { fetchBaseQuery, createApi, retry } from "@reduxjs/toolkit/query/react";

// UserData interfeysini aniqlash
export interface UserData {
  photo: string;
  fullName: string;
  username: string;
  email: string;
  bio?: string; // Bio maydoni ixtiyoriy
}

// Custom base query with authorization token and error handling
const baseQuery = async (args: any, api: any, extraOptions: any) => {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: import.meta.env.VITE_API_URL,
    prepareHeaders: (headers) => {
      const token = localStorage.getItem("accessToken");
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  });

  const result = await rawBaseQuery(args, api, extraOptions);

  // Error handling for unauthorized access
  if (result.error) {
    const { status } = result.error;
    if (status === 401 || status === 403) {
      console.error("Unauthorized access - Redirecting to login...");
      // You can add redirect code to the login page here
    }
  }

  return result;
};

// Wrapping base query with retry functionality
const baseQueryWithRetry = retry(baseQuery, { maxRetries: 0 });

// Creating the API with endpoints
export const api = createApi({
  reducerPath: "usersApi",
  baseQuery: baseQueryWithRetry,
  tagTypes: ["User"],
  endpoints: (builder) => ({
    // Endpoint for fetching current user data
    getCurrentUserDatas: builder.query<UserData, void>({
      query: () => "/api/user/current", // Your API endpoint
      providesTags: ["User"],
    }),
    // Endpoint to get user posts
    getUserPosts: builder.query<any, string>({
      query: (username) => `posts/user/${username}`, // Adding user name to the URL
      providesTags: ["User"], // Caching with tags
    }),
    // Endpoint to get user images
    getUserImages: builder.query<any, string>({
      query: (username) => `images/user/${username}`, // Adding user name to the URL
      providesTags: ["User"], // Caching with tags
    }),
    // New endpoint for updating user profile details
    updateUserProfile: builder.mutation<any, Partial<UserData>>({
      query: (body) => ({
        url: "/api/user/update", // Your API endpoint for updating user profile
        method: "PUT",
        body,
      }),
      invalidatesTags: [{ type: "User" }],
    }),
    // You can add other endpoints here
  }),
});

// Export hooks for using the queries and mutations
export const {
  useGetCurrentUserDatasQuery,
  useGetUserPostsQuery,
  useGetUserImagesQuery,
  useUpdateUserProfileMutation, // New hook for updating user profile
} = api;
