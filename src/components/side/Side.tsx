import { NavLink, useNavigate } from "react-router-dom";
import Logo from "../../../public/images/Logo.png";
import {ChatIcon,CreatePostIcon,ExploreIcon,HomeIcon,LogOutIcon,PeopleIcon,ReelsIcon,SavedIcon,SettignsIcon,} from "../../../public/images";
import { useGetUserQuery } from "../../redux/api/users-api";
import { Skeleton } from "@chakra-ui/react";
import { useState } from "react";
import { Modal } from "antd";

const Side: React.FC = () => {
  const navigate = useNavigate();
  const currentUserUsername = window.localStorage.getItem('userData') 
    ? JSON.parse(window.localStorage.getItem('userData') as string).username 
    : null;
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false); // Profil modal
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
    {
      id: 1,
      title: "Home",
      Icon: <HomeIcon />,
      path: "/",
    },
    {
      id: 2,
      title: "Explore",
      Icon: <ExploreIcon />,
      path: "/explore",
    },
    {
      id: 3,
      title: "People",
      Icon: <PeopleIcon />,
      path: "/people",
    },
    {
      id: 4,
      title: "Saved",
      Icon: <SavedIcon />,
      path: "/saved",
    },
    {
      id: 5,
      title: "Reels",
      Icon: <ReelsIcon />,
      path: "/reels",
    },
    {
      id: 6,
      title: "Chats",
      Icon: <ChatIcon />,
      path: "/chats",
    },
    {
      id: 7,
      title: "Create Post",
      Icon: <CreatePostIcon />,
      path: "/create",
    },
  ];

  const navbarLastPage = [
    {
      id: 1,
      title: "Logout",
      Icon: <LogOutIcon />,
    },
    {
      id: 2,
      title: "Settings",
      Icon: <SettignsIcon />,
    },
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
        
        <div className="flex items-center gap-[10px]">
          {isLoading ? (
            <Skeleton width="40px" height="40px" borderRadius="50%" />
          ) : (
            <img
              src={`${import.meta.env.VITE_API_URL}${data?.photo.username}`}
              className="w-[40px] h-[40px] rounded-full cursor-pointer"
              alt="User profile"
              onClick={openProfileModal} 
            />
          )}
          {isLoading ? (
            <Skeleton width="100%" height="20px" />
          ) : (
            <div className="flex flex-col text-white cursor-pointer" onClick={openProfileModal}>
              <h1 className="text-[14px] md:text-[18px] font-bold line-clamp-1">
                {data?.fullName || "User Name"}
              </h1>
              <p className="text-[12px] md:text-[14px] line-clamp-1 text-light-300">
                @{data?.username || "username"}
              </p>
            </div>
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
            footer={null} // Modal pastki qismidagi standart tugmalarni olib tashlash
          >
            <div className="flex flex-col items-center">
              <img
                src={`${import.meta.env.VITE_API_URL}${data?.photo}`}
                className="w-[80px] h-[80px] rounded-full"
                alt="User profile"
              />
              <h2 className="text-xl font-bold mt-4">{data?.fullName}</h2>
              <p className="text-gray-500">@{data?.username}</p>
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
