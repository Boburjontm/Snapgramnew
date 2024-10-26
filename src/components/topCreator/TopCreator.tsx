import { User } from "../../types";
import { Skeleton } from "@chakra-ui/react";
import {
  useFollowMutation,
  useGetAllUserQuery,
  useGetUserQuery,
  useUnfollowMutation,
} from "../../redux/api/api";
import Img from "../../../public/images/lion.svg";
import { Modal } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom"; 

function TopCreator() {
  const currentUser = JSON.parse(localStorage.getItem("userData") || "{}");
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();
  const username = currentUser?.username || "";
  const currentUserData = useGetUserQuery(username);
  const { data = [], isLoading } = useGetAllUserQuery(true);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleFollow = (username: string): void => {
    follow(username);
  };

  const handleUnfollow = (username: string): void => {
    unfollow(username);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
  };

  return (
    <div className="col-span-12 md:col-span-5 sticky top-0 right-0 h-screen overflow-y-auto px-4 md:px-6 py-6 md:py-12 bg-dark-200">
      <h1 className="font-bold text-[20px] md:text-[24px]">Top Creators</h1>
      <div className="grid grid-cols-12 gap-4 md:gap-6 mt-6 md:mt-10">
        {isLoading
          ? [...Array(6)].map((_, index) => (
              <div key={index} className="col-span-6">
                <Skeleton className="w-full h-[150px] md:h-[190px] rounded-lg" />
              </div>
            ))
          : data.map((user: User) => (
              <div
                key={user._id}
                className="bg-dark-200 col-span-12 md:col-span-6 flex flex-col gap-[10px] py-4 md:py-6 px-4 md:px-9 rounded-[20px] border border-dark-400"
              >
                {user.photo ? (
                  <img
                    className="w-[54px] h-[54px] rounded-full mx-auto"
                    src={user.photo}
                    alt={user.fullName}
                    onError={(e) => (e.currentTarget.src = Img)}
                  />
                ) : (
                  <div className="w-[54px] h-[54px] bg-black rounded-full mx-auto flex items-center justify-center">
                    <span className="text-white text-sm">No Image</span>
                  </div>
                )}
                <div className="text-center">
                  <Link to={`/profile/${user.username}`}>
                    <h1 className="text-[12px] md:text-[14px] font-semibold cursor-pointer">
                      {user.fullName}
                    </h1>
                  </Link>

                  <p className="text-[10px] text-light-300 font-medium">
                    Followed by jsmastery
                  </p>
                </div>
                {currentUserData.data?.following?.some(
                  (item: any) => item.username === user.username
                ) ? (
                  <button
                    onClick={() => {
                      handleUnfollow(user.username);
                    }}
                    className="unfollow-btn capitalize mx-auto"
                  >
                    unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => {
                      handleFollow(user.username);
                    }}
                    className="follow-btn capitalize mx-auto"
                  >
                    follow
                  </button>
                )}
              </div>
            ))}
      </div>

      <Modal
        title={selectedUser ? selectedUser.fullName : ""}
        visible={!!selectedUser}
        onCancel={handleCloseModal}
        footer={null}
      >
        {selectedUser && (
          <div className="flex flex-col items-center">
            <img
              className="w-[80px] h-[80px] rounded-full mb-4"
              src={import.meta.env.VITE_API_URL + selectedUser.photo}
              alt={selectedUser.fullName}
            />
            <h2 className="text-xl font-bold">{selectedUser.fullName}</h2>
            <p className="text-gray-500">@{selectedUser.username}</p>
            <p className="text-sm text-light-300">Followed by jsmastery</p>
          </div>
        )}
      </Modal>
    </div>
  );
}

export default TopCreator;
