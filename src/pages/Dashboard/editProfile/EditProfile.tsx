import { API } from "../../../hook/useEnv";
import {
  useUpdateUserMutation,
  useUploadFilesMutation,
} from "../../../redux/api/api";
import { FormEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Define types for the user data
interface UserData {
  photo: string;
  fullName: string;
  username: string;
  email: string;
  bio?: string;
}

const EditProfile: React.FC = () => {
  const [currentUserData, setCurrentUserData] = useState<UserData | null>(null);
  const [uploadFiles, { isLoading: isUploading }] = useUploadFilesMutation();
  const [userImg, setUserImg] = useState<string>("");
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  const navigate = useNavigate();

  // Fetch current user data using fetch API
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${API}/api/user/current`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data: UserData = await response.json();
        setCurrentUserData(data);
        setUserImg(data.photo);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleFileUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const selectedFiles = Array.from(files);
      const formData = new FormData();

      selectedFiles.forEach((file) => {
        formData.append("files", file, file.name);
      });

      try {
        const response = await uploadFiles(formData).unwrap();
        setUserImg(response.files[0]?.url || ""); // Ensure the URL exists
      } catch (error) {
        console.error("File upload error:", error);
      }
    }
  };

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data: UserData = {
      photo: userImg,
      fullName: formData.get("full_name")?.toString() || "",
      username: formData.get("username")?.toString() || "",
      email: formData.get("email")?.toString() || "",
      bio: formData.get("bio")?.toString() || undefined,
    };

    try {
      await updateUser(data).unwrap();
      navigate("/"); // Navigate to the home page after successful update
      window.location.reload(); // Reload the page to see changes
    } catch (error) {
      console.error("Update profile error:", error);
    }
  };

  if (!currentUserData) return <div>Loading...</div>; // Handle loading state
  if (!currentUserData.photo) return <div>Error loading user data</div>; // Handle potential errors

  return (
    <section className="w-full h-screen bg-black text-white overflow-y-auto px-[60px] py-[80px]">
      <div>
        <div className="flex items-center gap-[11px] mb-[50px]">
          <h1 className="capitalize tracking-[-1px] text-4xl font-bold">
            Edit Profile
          </h1>
        </div>
        <form
          onSubmit={handleFormSubmit}
          className="flex items-start gap-9 flex-col"
        >
          <div className="flex items-center gap-[14px]">
            <img
              className="w-[100px] h-[100px] object-cover rounded-full"
              src={API + userImg}
              onError={(e) =>
                (e.currentTarget.src = "/path/to/default/image.jpg")
              }
              alt="Profile"
            />
            <label htmlFor="newImg">
              <input
                accept="image/*"
                onChange={handleFileUpload}
                type="file"
                hidden
                id="newImg"
              />
              <span className="text-lg font-semibold cursor-pointer hover:opacity-80 duration-300 text-blue-100">
                {isUploading ? "Uploading..." : "Change profile photo"}
              </span>
            </label>
          </div>
          <InputField
            label="Name"
            name="full_name"
            defaultValue={currentUserData.fullName}
          />
          <InputField
            label="Username"
            name="username"
            defaultValue={currentUserData.username}
            prefix="@"
          />
          <InputField
            label="Email"
            name="email"
            type="email"
            defaultValue={currentUserData.email}
          />
          <InputField
            label="Bio"
            name="bio"
            defaultValue={currentUserData.bio || "Add your bio"}
            as="textarea"
          />
          <button className="ml-auto py-3 mt-10 rounded-lg px-5 bg-purple font-semibold">
            {isUpdating ? "Updating..." : "Update Profile"}
          </button>
        </form>
      </div>
    </section>
  );
};

interface InputFieldProps {
  label: string;
  name: string;
  defaultValue: string;
  type?: string;
  prefix?: string;
  as?: "input" | "textarea";
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  name,
  defaultValue,
  type = "text",
  prefix,
  as,
}) => (
  <label className="flex flex-col gap-3 w-full">
    <span className="text-lg font-medium">{label}</span>
    {as === "textarea" ? (
      <textarea
        name={name}
        defaultValue={defaultValue}
        rows={3}
        className="bg-dark-300 resize-none outline-none w-full py-4 px-5 font-semibold"
      />
    ) : (
      <div
        className={`flex items-center bg-dark-300 w-full py-4 px-5 font-semibold ${
          prefix ? "gap-2" : ""
        }`}
      >
        {prefix && <p>{prefix}</p>}
        <input
          type={type}
          name={name}
          defaultValue={defaultValue}
          className="w-full bg-transparent outline-none"
        />
      </div>
    )}
  </label>
);

export default EditProfile; // Export your component
