import {
  useGetCurrentUserDatasQuery,
  useUpdateUserMutation,
  useUploadFilesMutation,
} from "../../../redux/api/api";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function UserProfileEdit() {
  const { data: userProfileData } = useGetCurrentUserDatasQuery(true);
  const [uploadFile, { isLoading: isUploading }] = useUploadFilesMutation();
  const [profileImage, setProfileImage] = useState<string>("");
  const [updateProfile, { isLoading: isUpdating }] = useUpdateUserMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (userProfileData?.photo) {
      setProfileImage(userProfileData.photo);
    }
  }, [userProfileData]);

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const selectedFiles = event.target.files;
    if (selectedFiles && selectedFiles.length > 0) {
      const formData = new FormData();
      Array.from(selectedFiles).forEach((file) => {
        formData.append("files", file, file.name);
      });

      try {
        const response = await uploadFile(formData).unwrap();
        const uploadedImageUrl = response?.files?.[0]?.url;
        if (uploadedImageUrl) setProfileImage(uploadedImageUrl);
      } catch (error) {
        console.error("File upload error:", error);
      }
    }
  };

  const handleProfileUpdate = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const updatedProfileData = {
      photo: profileImage,
      full_name: formData.get("full_name")?.toString(),
      username: formData.get("username")?.toString(),
      email: formData.get("email")?.toString(),
      bio: formData.get("bio")?.toString(),
    };

    try {
      await updateProfile(updatedProfileData).unwrap();
      const updatedUser = {
        ...userProfileData,
        username: updatedProfileData.username,
        full_name: updatedProfileData.full_name,
      };
      window.localStorage.setItem("userData", JSON.stringify(updatedUser));
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Profile update error:", error);
    }
  };

  // Conditional loading UI
  if (isUploading || isUpdating) {
    return (
      <div className="flex items-center justify-center h-screen bg-black text-white">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-solid"></div>
      </div>
    );
  }

  return (
    <section className="w-full h-screen bg-black text-white overflow-y-auto px-[60px] py-[80px]">
      {userProfileData && (
        <div>
          <div className="flex items-center gap-[11px] mb-[50px]">
            <h1 className="capitalize tracking-[-1px] text-4xl font-bold">
              Edit Profile
            </h1>
          </div>
          <form
            onSubmit={handleProfileUpdate}
            className="flex items-start gap-9 flex-col"
          >
            <div className="flex items-center gap-[14px]">
              <img
                className="w-[100px] h-[100px] object-cover rounded-full"
                src={profileImage || "path/to/default/image.png"}
                onError={(e) =>
                  (e.currentTarget.src = "path/to/default/image.png")
                }
                alt="Profile"
              />
              <label htmlFor="profileImageInput">
                <input
                  accept="image/*"
                  onChange={handleFileChange}
                  type="file"
                  hidden
                  id="profileImageInput"
                />
                <span className="text-lg font-semibold cursor-pointer hover:opacity-80 duration-300 text-blue-100">
                  {isUploading ? "Uploading..." : "Change profile photo"}
                </span>
              </label>
            </div>
            <label className="flex flex-col gap-3 w-full">
              <span className="text-lg font-medium">Name</span>
              <input
                type="text"
                name="full_name"
                defaultValue={userProfileData.full_name}
                className="bg-gray-900 outline-none w-full py-4 rounded-lg px-5 font-semibold"
              />
            </label>
            <label className="flex flex-col gap-3 w-full">
              <span className="text-lg font-medium">Username</span>
              <div className="flex items-center bg-gray-900 outline-none w-full py-4 px-5 font-semibold">
                <p>@</p>
                <input
                  type="text"
                  name="username"
                  defaultValue={userProfileData.username}
                  className="w-full bg-gray-900 outline-none rounded-lg"
                />
              </div>
            </label>
            <label className="flex flex-col gap-3 w-full">
              <span className="text-lg font-medium">Email</span>
              <input
                name="email"
                type="email"
                defaultValue={userProfileData.email}
                className="bg-gray-900 outline-none w-full rounded-lg py-4 px-5 font-semibold"
              />
            </label>
            <label className="flex flex-col gap-3 w-full">
              <span className="text-lg font-medium">Bio</span>
              <textarea
                name="bio"
                defaultValue={userProfileData.bio || ""}
                rows={3}
                className="bg-gray-900 resize-none rounded-lg outline-none w-full py-4 px-5 font-semibold"
              ></textarea>
            </label>
            <button className="ml-auto py-3 mt-10 rounded-lg px-5 bg-[#877EFF] font-semibold">
              {isUpdating ? "Updating..." : "Update Profile"}
            </button>
          </form>
        </div>
      )}
    </section>
  );
}

export default UserProfileEdit;
