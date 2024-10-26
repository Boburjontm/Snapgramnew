import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../../public/images/Logo.png";
import { Skeleton } from "@chakra-ui/react";
import Img from "../../../public/images/lion.svg";
import {
  HomeIcon,
  ExploreIcon,
  PeopleIcon,
  SavedIcon,
  ReelsIcon,
  ChatIcon,
  CreatePostIcon,
  LogOutIcon,
  SettignsIcon,
} from "../../../public/images";
import { useGetUserQuery } from "../../redux/api/api";
import { Modal } from "antd";

const Side: React.FC = () => {
  const navigate = useNavigate();
  const currentUserUsername = localStorage.getItem("userData")
    ? JSON.parse(localStorage.getItem("userData") as string).username
    : null;

  const [isOpenModal, setIsOpenModal] = useState(false);
  const { data: userData, isLoading } = useGetUserQuery(currentUserUsername);

  const handleLogOut = () => {
    localStorage.clear();
    setTimeout(() => {
      window.location.reload();
    }, 100);
    navigate("/");
    setIsOpenModal(false);
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

  const navbarLast = [
    { id: 1, title: "Logout", Icon: <LogOutIcon /> },
    { id: 2, title: "Settings", Icon: <SettignsIcon /> },
  ];

  return (
    <div className="md:col-span-2 px-4 md:px-[24px] bg-dark-200 h-full md:h-screen overflow-y-scroll text-white pt-6 md:pt-[48px] pb-6 md:pb-[32px] col-span-10">
      <style>
        {`
          ::-webkit-scrollbar { display: none; }
          * { scrollbar-width: none; }
        `}
      </style>
      <div className="flex flex-col gap-8 md:gap-11 h-full">
        <img
          src={Logo}
          className="w-[120px] md:w-[171px] h-[36px]"
          alt="App Logo"
        />

        <div className="flex gap-[10px] items-center mt-[44px]">
          {isLoading ? (
            <Skeleton width="56px" height="56px" borderRadius="50%" />
          ) : (
            <img
              className="rounded-full bg-white-500 cursor-pointer"
              src={
                userData?.photo
                  ? `${import.meta.env.VITE_API_URL}${userData.photo}`
                  : Img
              }
              alt="User profile"
              width={56}
              height={56}
              onError={(e) => (e.currentTarget.src = Img)}
            />
          )}
          {isLoading ? (
            <Skeleton width="100%" height="20px" />
          ) : (
            <NavLink to={`/profile`} className="flex flex-col">
              <p className="capitalize">{userData?.fullName || "User Name"}</p>
              <p className="capitalize text-gray-500 text-[14px]">
                @{userData?.username || "username"}
              </p>
            </NavLink>
          )}
        </div>

        <nav className="flex flex-col gap-6 h-full text-white">
          {navbarPages.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              className="flex gap-4 p-2 md:p-4 items-center text-white hover:bg-black active:text-primary_500 rounded-lg relative after:content-[''] after:absolute after:top-0 after:left-0 after:bottom-0 after:w-1 after:bg-gradient-to-r after:from-black/30 after:to-transparen"
            >
              <span className="text-primary_500 hover:text-white relative after:content-[''] after:absolute after:top-0 after:left-0 after:bottom-0 after:w-1 after:bg-gradient-to-r after:from-black/30 after:to-transparent">
                {item.Icon}
              </span>

              <span className="text-sm md:text-base">{item.title}</span>
            </NavLink>
          ))}

          <div className="mt-auto">
            {navbarLast.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  if (item.title === "Logout") setIsOpenModal(true);
                }}
                className="flex gap-4 p-2 md:p-4 hover:bg-white/20 rounded-lg cursor-pointer "
              >
                <span className="text-primary_500 hover:text-white active:text-white ">
                  {item.Icon}
                </span>

                <span className="text-sm md:text-base">{item.title}</span>
              </div>
            ))}
          </div>

          <Modal
            title={<span className="text-white">Log Out</span>}
            open={isOpenModal}
            onCancel={() => setIsOpenModal(false)}
            footer={null}
            className="logout-modal"
            style={{
              zIndex: 1000,
            }}
            bodyStyle={{
              backgroundColor: "rgba(0, 0, 0, 0.8)",
              borderRadius: "10px",
              padding: "40px",
            }}
            width="100%"
            centered // Center the modal
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-white mb-4">
                Are you sure you want to log out, {userData?.fullName || "User"}
                ?
              </h2>
              <p className="text-white mb-6">
                Please confirm to log out from your account.
              </p>
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setIsOpenModal(false)}
                  className="bg-gray-700 hover:bg-gray-600 text-white py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  onClick={handleLogOut}
                  className="bg-red-600 hover:bg-red-500 text-white py-2 px-4 rounded"
                >
                  Log Out
                </button>
              </div>
            </div>
          </Modal>
        </nav>
      </div>

      <style>
        {`
          .ant-modal-mask {
            background: rgba(0, 0, 0, 0.8);
            backdrop-filter: blur(10px); /* Create the glass effect */
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            z-index: 999; /* Ensure it stays on top */
          }
        `}
      </style>
    </div>
  );
};

export default Side;
