import DefaultImage from "../../../../public/images/lion.svg"; // Changed Image to DefaultImage
import { useNavigate } from "react-router-dom";
import {
  useGetAllPostsQuery,
  useGetUserNameQuery,
} from "../../../redux/api/api";

const UserProfile = () => {
  const navigate = useNavigate();
  const currentUser = window.localStorage.getItem("userData")
    ? JSON.parse(window.localStorage.getItem("userData") as string)
    : null;

  const currentUsername = currentUser?.username;
  const { data: userData, isLoading: isUserLoading } =
    useGetUserNameQuery(currentUsername);
  const { data: userPosts, isLoading: isPostsLoading } =
    useGetAllPostsQuery(currentUsername);

  // Conditional loading UI
  if (isUserLoading || isPostsLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-y-auto bg-black text-white">
      <div className="w-full p-4 md:p-10 lg:p-[40px] rounded-md shadow-lg pt-[60px] pl-4 md:pl-10 lg:pl-[80px]">
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-[30px]">
          <div className="relative">
            <img
              onError={(e) => (e.currentTarget.src = DefaultImage)}
              src={userData?.photo || DefaultImage}
              alt={userData?.fullname}
              className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full object-cover border-gray-700 shadow-xl transition-transform duration-200"
            />
          </div>
          <div className="text-left">
            {userData?.fullName && (
              <h2 className="text-[24px] md:text-[36px] font-bold mb-2 text-white">
                {userData.fullName}
              </h2>
            )}
            {userData?.username && (
              <p className="text-[#7878A3] text-[16px] md:text-[18px] mb-[20px]">
                <span className="font-semibold">Username: @</span>
                {userData.username}
              </p>
            )}
            {userData?.bio && (
              <p className="text-gray-400 text-[16px] md:text-[18px] mb-4">
                {userData.bio}
              </p>
            )}

            <div className="flex items-center gap-8 mt-6">
              <div className="text-center">
                <p className="font-bold text-lg md:text-xl text-white">
                  {userData?.followers?.length || 0}
                </p>
                <p className="text-sm text-gray-400">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg md:text-xl text-white">
                  {userData?.following?.length || 0}
                </p>
                <p className="text-sm text-gray-400">Following</p>
              </div>
            </div>
            <button
              onClick={() => navigate("/edit-profile")}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-500 transition duration-300"
            >
              Edit Profile
            </button>
          </div>
        </div>

        <h2 className="text-white text-[24px] md:text-[30px] font-semibold mb-8">
          Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 ">
          {userPosts?.map((post: any, index: number) => (
            <div
              key={index}
              className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
            >
              <div className="p-4 shadow-lg">
                {post?.content[0]?.type === "IMAGE" ? (
                  <img
                    src={post?.content[0]?.url || DefaultImage}
                    alt={post?.content_alt || "Post image"}
                    className="w-full object-cover rounded-lg"
                  />
                ) : (
                  <div>
                    <video controls src={post?.content[0]?.url}></video>
                  </div>
                )}

                <div className="pt-[12px]">
                  <h3 className="text-lg md:text-xl font-semibold text-white mb-2 truncate">
                    {post?.content_alt || "Untitled"}
                  </h3>
                  <p className="text-gray-400 mb-1">
                    Location: {post?.location || "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
