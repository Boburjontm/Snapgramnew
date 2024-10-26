import { useGetUserProductQuery } from "../../../redux/api/api";
import Image from "../../../../public/images/lion.svg"; 
import { useParams } from "react-router-dom";

const UserProfile = () => {
  const { id } = useParams();
  const { data, error, isLoading } = useGetUserProductQuery(id);

  if (isLoading) {
    return (
      <div className="h-screen flex items-center justify-center bg-black text-white">
        <div className="flex flex-col items-center">
          <div className="loader border-8 border-t-8 border-gray-700 border-t-blue-500 rounded-full w-16 h-16 animate-spin"></div>
          <p className="mt-4 text-lg">Loading...</p>
        </div>
      </div>
    );
  }

  if (error)
    return <p className="text-center text-red-500">Error loading data</p>;

  return (
    <div className="h-screen overflow-y-auto bg-black text-white">
      <div className="w-full p-4 md:p-10 lg:p-[40px] rounded-md shadow-lg pt-[60px] pl-4 md:pl-10 lg:pl-[80px]">
        {/* Foydalanuvchi profili */}
        <div className="flex flex-col lg:flex-row items-center gap-12 mb-[30px]">
          <div className="relative">
            <img
              onError={(e) => (e.currentTarget.src = Image)}
              src={data?.photo}
              alt={data?.fullname}
              className="w-[120px] h-[120px] md:w-[160px] md:h-[160px] rounded-full object-cover border-gray-700 shadow-xl transition-transform duration-200 hover:scale-110"
            />
          </div>
          <div className="text-left">
            {data?.fullName && (
              <h2 className="text-[24px] md:text-[36px] font-bold mb-2 text-white">
                {data.fullName}
              </h2>
            )}
            {data?.username && (
              <p className="text-[#7878A3] text-[16px] md:text-[18px] mb-[20px]">
                <span className="font-semibold">Username: @</span>
                {data.username}
              </p>
            )}
            <div className="flex items-center gap-8 mt-6">
              <div className="text-center">
                <p className="font-bold text-lg md:text-xl text-white">
                  {data?.followers?.length || 0}
                </p>
                <p className="text-sm text-gray-400">Followers</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-lg md:text-xl text-white">
                  {data?.following?.length || 0}
                </p>
                <p className="text-sm text-gray-400">Following</p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-white text-[24px] md:text-[30px] font-semibold mb-8">
          Posts
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {data?.posts?.length > 0 ? (
            data.posts.map((post: any, index: number) => (
              <div
                key={index}
                className="rounded-lg shadow-lg transform hover:scale-105 transition-transform duration-300"
              >
                <div className="p-4 shadow-lg">
                  {post?.type === "IMAGE" ? (
                    <img
                      src={post?.photo || Image}
                      alt={post?.caption || "Post image"}
                      className="w-full object-cover rounded-lg"
                      onError={(e) => (e.currentTarget.src = Image)}
                    />
                  ) : (
                    <div>
                      <video
                        controls
                        src={post?.videoUrl || ""}
                        className="w-full rounded-lg"
                      />
                    </div>
                  )}
                  <div className="pt-[12px]">
                    <h3 className="text-lg md:text-xl font-semibold text-white mb-2">
                      {post?.caption || "Untitled"}
                    </h3>
                    <p className="text-gray-400 mb-1">
                      Location: {post?.location || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-16">
              <p className="text-white text-xl">No posts found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
