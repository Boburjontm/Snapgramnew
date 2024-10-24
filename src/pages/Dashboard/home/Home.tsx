import Img from "../../../../public/images/lion.svg";
import TopCreator from "../../../components/topCreator/TopCreator";
import "swiper/css/navigation";
import { useGetAllUserQuery, useGetFeedQuery, useGetUserQuery } from "../../../redux/api/users-api";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

export const imageFileTypes = [".png", ".jpeg", ".jpg", ".gif", ".bmp", ".webp", ".tiff", ".svg"];

function Home() {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options).replace(",", " at");
  };

  const currentUserUsername = window.localStorage.getItem("userData")
    ? JSON.parse(window.localStorage.getItem("userData") as string).username
    : null;
  const { data: feeds } = useGetFeedQuery(true);
  const { data: currentUserData } = useGetUserQuery(currentUserUsername);
  const { data: allUser } = useGetAllUserQuery(true);

  const UsersCard = (): JSX.Element => {
    const followingUsers = currentUserData?.following?.map((followingUser: any) =>
      allUser?.find((user: any) => user.username === followingUser.username)
    );

    return (
      <div className="flex gap-4 w-[96px] h-[84px]">
        {followingUsers?.filter((user: any) => user).map((user: any, index: number) => (
          <div key={index} className="text-center flex flex-col items-center">
            <img
              src={import.meta.env.VITE_API_URL + user.photo}
              onError={(e) => (e.currentTarget.src = Img)}
              alt={user.username}
              className="size-12 rounded-full object-cover"
              style={{ width: "48px", height: "48px", objectFit: "cover" }}
            />
            <h1 className="text-xs font-semibold mt-[6px]">{user.username}</h1>
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className="grid grid-cols-12 h-screen overflow-y-auto text-white">
      <div className="col-span-12 lg:col-span-7 text-white px-[20px] md:px-[40px] py-[40px] md:py-[60px] bg-black">
        <header>
          {currentUserData?.following.length ? (
            <div className="flex overflow-x-auto">
              <UsersCard />
            </div>
          ) : (
            <p className="text-center font-bold text-light-300 text-xs">
              Not yet followed User available...
            </p>
          )}
        </header>
        <div className="mt-[40px]">
          <h1 className="text-[20px] md:text-[30px] mb-[30px] md:mb-[40px] font-bold">Home Feed</h1>
          <div className="flex flex-col gap-[30px] md:gap-[40px]">
            {feeds?.posts?.length ? (
              feeds?.posts?.map((post: any, index: number) => (
                <div key={index} className="px-[20px] md:px-[29px] py-[30px] md:py-[36px] border border-dark-400">
                  <header className="mb-[30px] md:mb-[40px]">
                    <div className="flex gap-[10px]">
                      <img
                        className="size-[40px] md:size-[50px] rounded-full object-cover"
                        src={
                          import.meta.env.VITE_API_URL +
                          allUser?.find((user: any) => user._id === post?.owner)?.photo
                        }
                        onError={(e) => (e.currentTarget.src = Img)}
                        alt="Post owner"
                      />
                      <div className="mb-[20px] flex flex-col">
                        <h1 className="text-[16px] md:text-[18px] font-semibold">
                          {allUser?.find((user: any) => user._id === post?.owner)?.username}
                        </h1>
                        <p className="text-[12px] md:text-[14px] text-light-300 font-bold">
                          {formatDate(post?.createdAt)}
                        </p>
                      </div>
                    </div>
                    <p className="font-semibold">{post?.content_alt}</p>
                  </header>
                  <Swiper key={index} navigation={true} spaceBetween={10} modules={[Navigation]}>
                    {post.content &&
                      post.content?.map((content: any, contentIndex: number) => {
                        if (typeof content === "string" && imageFileTypes.some((type) => content?.includes(type))) {
                          return (
                            <SwiperSlide key={contentIndex} className="select-none">
                              <img
                                className="rounded-[20px] md:rounded-[30px]"
                                src={content}
                                onError={(e) => (e.currentTarget.src = Img)}
                                alt="Post content"
                              />
                            </SwiperSlide>
                          );
                        } else if (typeof content === "string") {
                          return (
                            <SwiperSlide key={contentIndex}>
                              <video controls className="w-full h-full object-cover" src={content}></video>
                            </SwiperSlide>
                          );
                        } else {
                          return null;
                        }
                      })}
                  </Swiper>
                </div>
              ))
            ) : (
              <p>Not yet post available...</p>
            )}
          </div>
        </div>
      </div>
      <div className="col-span-12 lg:col-span-5">
        <TopCreator />
      </div>
    </section>
  );
}

export default Home;
