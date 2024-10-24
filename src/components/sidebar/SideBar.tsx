import { useState } from "react";
import { Skeleton } from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";
import { useGetUserQuery } from "../../redux/api/users-api";
import Logo from "../../../public/images/Logo.png";
import Img from "../../../public/images/lion.svg";
import {
  ChatIcon,
  CreatePostIcon,
  ExploreIcon,
  HomeIcon,
  LogOutIcon,
  PeopleIcon,
  ReelsIcon,
  SavedIcon,
  SettignsIcon,
} from "../../../public/images";
import { Modal } from "antd";

const Side: React.FC = () => {
  const navigate = useNavigate();
  const currentUserUsername = window.localStorage.getItem('userData') 
    ? JSON.parse(window.localStorage.getItem('userData') as string).username 
    : null;

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false); // Profile modal
  const { data, isLoading } = useGetUserQuery(currentUserUsername);

  const handleLogOut = () => {
    window.localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 100);
    navigate('/');
    setIsOpenModal(false);
  };

  const openProfileModal = () => {
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
  };

  const navbarPages = [
    { id: 1, title: "Home", Icon: <HomeIcon />, path: "/" },
    { id: 2, title: "Explore", Icon: <ExploreIcon />, path: "/explore" },
    { id: 3, title: "People", Icon: <PeopleIcon />, path: "/people" },
    { id: 4, title: "Saved", Icon: <SavedIcon />, path: "/saved" },
    { id: 5, title: "Reels", Icon: <ReelsIcon />, path: "/reels" },
    { id: 6, title: "Chats", Icon: <ChatIcon />, path: "/chats" },
    { id: 7, title: "Create Post", Icon: <CreatePostIcon />, path: "/create" },
  ];

  const navbarLastPage = [
    { id: 1, title: "Logout", Icon: <LogOutIcon /> },
    { id: 2, title: "Settings", Icon: <SettignsIcon /> },
  ];

  return (
    <aside className="col-span-12 md:col-span-2 px-4 md:px-[24px] bg-dark-200 h-full md:h-screen overflow-y-scroll text-white pt-6 md:pt-[48px] pb-6 md:pb-[32px]">
      <style>
        {`
          /* Hiding scrollbar */
          ::-webkit-scrollbar {
            display: none;
          }
          /* For Firefox */
          * {
            scrollbar-width: none; /* Hide scrollbar for Firefox */
          }
        `}
      </style>
      <div className="flex flex-col gap-8 md:gap-11 h-full">
        <img src={Logo} className="w-[120px] md:w-[171px] h-[36px]" alt="Logo" />

        <div className="flex gap-[10px] items-center mt-[44px]">
          {isLoading ? (
            <Skeleton width="56px" height="56px" borderRadius="50%" />
          ) : (
            <img
              className="rounded-full bg-white cursor-pointer"
              src={data?.photo ? `${import.meta.env.VITE_API_URL}${data?.photo}` : Img}
              alt="User profile"
              width={56}
              height={56}
              onError={(e) => (e.currentTarget.src = Img)} // Fallback image
            />
          )}
          {isLoading ? (
            <Skeleton width="100%" height="20px" />
          ) : (
            <NavLink to={`/profile`} className="flex flex-col" >
              <p className="capitalize">{data?.fullName || "User Name"}</p>
              <p className="capitalize text-gray-500 text-[14px]">@{data?.username || "username"}</p>
            </NavLink>
          )}
        </div>

        <nav className="flex flex-col gap-6 h-full">
          {navbarPages.map((item) => (
            <NavLink key={item.id} to={item.path} className="flex gap-4 p-2 md:p-4 items-center hover:bg-black rounded-lg">
              <p className="text-primary_500">{item.Icon}</p>
              <p className="text-sm md:text-base">{item.title}</p>
            </NavLink>
          ))}

          <div className="mt-auto">
            {navbarLastPage.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.title === "Logout") {
                    setIsOpenModal(true);
                  }
                }}
                className="flex gap-4 p-2 md:p-4 hover:bg-white/20 rounded-lg cursor-pointer"
              >
                <p className="text-primary_500">{item.Icon}</p>
                <p className="text-sm md:text-base">{item.title}</p>
              </div>
            ))}
          </div>

          {/* Logout Modal */}
          <Modal
            title="Log Out"
            open={isOpenModal}
            onOk={handleLogOut}
            onCancel={() => setIsOpenModal(false)}
          >
            <p className="text-center font-bold text-xl">
              Are you sure you want to log out?
            </p>
          </Modal>

          {/* Profile Modal */}
          <Modal
            title="Profile Information"
            open={isProfileModalOpen}
            onOk={closeProfileModal}
            onCancel={closeProfileModal}
            footer={null} // Remove default modal buttons
          >
            <div className="flex flex-col items-center">
              <img
                src={data?.photo ? `${import.meta.env.VITE_API_URL}${data?.photo}` : Img}
                className="w-[80px] h-[80px] rounded-full"
                alt="User profile"
                onError={(e) => (e.currentTarget.src = Img)} // Fallback for profile image
              />
              <h2 className="text-xl font-bold mt-4">{data?.fullName || "User Name"}</h2>
              <p className="text-gray-500">@{data?.username || "username"}</p>
              <p className="text-sm text-light-300">
                {data?.bio || "No bio available"}
              </p>
            </div>
          </Modal>
        </nav>
      </div>
    </aside>
  );
};

export default Side;
