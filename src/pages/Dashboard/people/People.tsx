import { Skeleton } from "@chakra-ui/react";
import { AllUsersIcon } from "../../../../public/images";
import {
  useFollowMutation,
  useGetAllUserQuery,
  useGetUserQuery,
  useUnfollowMutation,
} from "../../../redux/api/users-api";
import { User } from "../../../types";
import { useState } from "react";
import { Modal } from "antd";

function People() {
  const { data = [], isLoading } = useGetAllUserQuery(true);
  const [follow] = useFollowMutation();
  const [unfollow] = useUnfollowMutation();
  const currentUser = JSON.parse(localStorage.getItem("userData") || "{}");
  const username = currentUser?.username || "";
  const currentUserData = useGetUserQuery(username);

  // Modalni boshqarish uchun state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const handleFollow = (username: string): void => {
    follow(username);
  };

  const handleUnfollow = (username: string): void => {
    unfollow(username);
  };

  // Profilni bosganda modalni ochish funksiyasi
  const openUserModal = (user: User) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  // Modalni yopish funksiyasi
  const closeUserModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  return (
    <section className="h-screen overflow-y-auto bg-black flex flex-col gap-6 md:gap-10 text-white px-[20px] md:px-[40px] lg:px-[60px] py-[40px] md:py-[80px]">
      <div className="flex items-center gap-[10px]">
        <AllUsersIcon />
        <h1 className="text-[24px] md:text-[36px] font-bold">All Users</h1>
      </div>

      <div className="grid grid-cols-12 gap-6 md:gap-12">
        {isLoading
          ? [...Array(6)].map((_item, index) => (
              <Skeleton
                key={index}
                className="col-span-12 md:col-span-6 lg:col-span-4 h-[150px] md:h-[190px] rounded-lg"
              />
            ))
          : data.map((user: User) => (
              <div
                key={user._id}
                className="bg-dark-200 col-span-12 md:col-span-6 lg:col-span-4 flex flex-col gap-[10px] py-6 px-4 md:px-9 rounded-[20px] border border-dark-400 cursor-pointer"
                onClick={() => openUserModal(user)} // Profilni bosganda modal ochiladi
              >
                {/* Rasm mavjud bo'lsa, uni ko'rsatamiz, aks holda hech qanday ma'lumot yo'q */}
                {user.photo ? (
                  <img
                    className="w-[54px] h-[54px] rounded-full mx-auto"
                    src={import.meta.env.VITE_API_URL + user.photo}
                    alt={user.fullName}
                    onError={(e) => (e.currentTarget.src = "fallback-image-url")}
                  />
                ) : (
                  <div className="w-[54px] h-[54px] rounded-full mx-auto bg-transparent"></div>
                )}
                <div className="text-center">
                  <h1 className="text-[14px] font-semibold">{user.fullName}</h1>
                  <p className="text-[10px] text-light-300 font-medium">
                    @{user.username}
                  </p>
                </div>

                {/* Follow/Unfollow tugmalari kartochkaning ichida */}
                {currentUserData.data?.following?.some(
                  (item: any) => item.username === user.username
                ) ? (
                  <button
                    onClick={() => handleUnfollow(user.username)}
                    className="unfollow-btn capitalize mx-auto"
                  >
                    Unfollow
                  </button>
                ) : (
                  <button
                    onClick={() => handleFollow(user.username)}
                    className="follow-btn capitalize mx-auto"
                  >
                    Follow
                  </button>
                )}
              </div>
            ))}
      </div>

      {/* Modal */}
      <Modal
        className="bg-black-200"
        title={selectedUser?.fullName || "User Info"}
        open={isModalOpen}
        onCancel={closeUserModal}
        footer={null} 
      >
        {selectedUser && (
          <div className="flex flex-col items-center gap-4">
            {selectedUser.photo ? (
              <img
                src={import.meta.env.VITE_API_URL + selectedUser.photo}
                alt={selectedUser.fullName}
                className="w-[100px] h-[100px] rounded-full"
              />
            ) : (
              <div className="w-[100px] h-[100px] rounded-full bg-transparent mx-auto"></div>
            )}
            <h1 className="text-lg font-bold">{selectedUser.fullName}</h1>
            <p className="text-gray-500">@{selectedUser.username}</p>

            {/* Follow / Unfollow tugmalari modal ichida */}
            {currentUserData.data?.following?.some(
              (item: any) => item.username === selectedUser.username
            ) ? (
              <button
                onClick={() => handleUnfollow(selectedUser.username)}
                className="unfollow-btn capitalize"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={() => handleFollow(selectedUser.username)}
                className="follow-btn capitalize"
              >
                Follow
              </button>
            )}
          </div>
        )}
      </Modal>
    </section>
  );
}

export default People;
