import { FormEvent, useState } from "react";
import { useCreatePostMutation, useUploadFilesMutation } from "../../../redux/api/users-api";
import { useNavigate } from "react-router-dom";
import { imageFileTypes } from "../home/Home";

const CreatePostIcon = "/images/CreatePostIcon.svg";
const FileIcon = "/images/FileIcon.svg";
const ImportFilesIcon = "/images/ImportFilesIcon.svg";
const LocationIcon = "/images/LocationIcon.svg";

function CreatePost() {
  const navigate = useNavigate();
  const [uploadFiles, { isLoading }] = useUploadFilesMutation();
  const [createPost, { isLoading: isLoadingPost }] = useCreatePostMutation();
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);
  const [caption, setCaption] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [altText, setAltText] = useState<string>("");
  const [uploadedMedia, setUploadedMedia] = useState<any>([]);

  function handleUpload() {
    const formData = new FormData();
    formData.append("location", location);
    formData.append("content_alt", altText);
    mediaFiles.forEach((file) => {
      formData.append("files", file, file.name);
    });

    uploadFiles(formData)
      .unwrap()
      .then((response) => {
        const fileUrls = response.files.flat().map((file: { url: string }) => file.url);
        const mediaContent = fileUrls.map((url: string) => {
          const isImage = imageFileTypes.some((type) => url.includes(type));
          return { url, type: isImage ? "IMAGE" : "VIDEO" };
        });
        setUploadedMedia(mediaContent);
      });
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    const postData = {
      content: uploadedMedia,
      location,
      content_alt: altText,
      caption,
    };

    createPost(postData)
      .unwrap()
      .then(() => navigate("/"));
  }

  return (
    <section className="w-full h-screen overflow-y-auto py-[80px] px-[60px] bg-black text-white">
      <div className="flex items-center gap-[20px] mb-[50px]">
        <span className="scale-150">
          <img src={CreatePostIcon} alt="Create Post" />
        </span>
        <p className="text-4xl font-bold">Create a Post</p>
      </div>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-9">
        {/* Caption Input */}
        <label className="flex flex-col gap-3">
          <span className="font-medium text-lg">Caption</span>
          <textarea
            required
            rows={4}
            name="caption"
            className="bg-dark-300 resize-none p-4 outline-none"
            placeholder="Write a caption..."
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>
        </label>

        {/* Media Upload Section */}
        <label className="flex flex-col gap-3 relative">
          <span className="font-medium text-lg">Add Photos/Videos</span>
          {mediaFiles.length ? (
            <div className="bg-dark-300 w-full flex-wrap flex gap-3 p-10">
              {mediaFiles.map((file, index) => {
                const mediaUrl = URL.createObjectURL(file);
                return (
                  <div className="relative" key={index}>
                    {file.type.includes("video") ? (
                      <video
                        src={mediaUrl}
                        controls
                        width={300}
                        className="object-contain"
                      />
                    ) : (
                      <img
                        width={300}
                        className="object-contain"
                        src={mediaUrl}
                        alt={`media-${index}`}
                      />
                    )}
                    <button
                      type="button"
                      className="absolute top-0 right-0 bg-red-500 text-white p-2"
                      onClick={() =>
                        setMediaFiles(mediaFiles.filter((_, i) => i !== index))
                      }
                    >
                      Remove
                    </button>
                  </div>
                );
              })}
              <div className="absolute right-3 bottom-3 flex items-center space-x-5">
                <button
                  type="button"
                  className="font-semibold py-3 h-fit px-[20px] bg-purple w-fit mt-auto ml-auto rounded-lg"
                  onClick={handleUpload}
                >
                  {isLoading ? "Uploading..." : "Upload"}
                </button>
                <label htmlFor="chooseFile" className="cursor-pointer">
                  <input
                    onChange={(e) =>
                      setMediaFiles((prev) => [
                        ...prev,
                        ...Array.from(e.target.files || []).filter(
                          (file) => !prev.includes(file)
                        ),
                      ])
                    }
                    type="file"
                    id="chooseFile"
                    hidden
                    accept="image/*, video/*"
                    multiple
                  />
                  <span className="font-semibold py-3 h-fit px-[20px] bg-purple w-fit mt-auto ml-auto rounded-lg">
                    Choose another one
                  </span>
                </label>
              </div>
            </div>
          ) : (
            <div className="bg-dark-300 py-[48px] relative">
              <div className="flex flex-col items-center justify-center">
                <img src={ImportFilesIcon} alt="Import Files" />
                <h1 className="text-lg font-semibold mt-3 mb-2">
                  Drag photos and videos here
                </h1>
                <p className="text-xs text-light-400">
                  SVG, PNG, JPG, or GIF (max. 800x400px)
                </p>
                <label htmlFor="chooseFile" className="mt-4 cursor-pointer">
                  <span className="text-xs font-semibold py-[10px] px-[20px] rounded-lg bg-dark-400">
                    Select from computer
                  </span>
                  <input
                    onChange={(e) =>
                      setMediaFiles(Array.from(e.target.files || []))
                    }
                    type="file"
                    id="chooseFile"
                    hidden
                    accept="image/*, video/*"
                    multiple
                  />
                </label>
              </div>
              <span className="absolute right-[26px] size-12 flex items-center justify-center bottom-[26px] bg-dark-400">
                <img src={FileIcon} alt="File Icon" />
              </span>
            </div>
          )}
        </label>

        {/* Location Input */}
        <label className="flex flex-col gap-3">
          <span className="font-medium text-lg">Add Location</span>
          <div className="bg-dark-300 flex items-center p-2 justify-between">
            <input
              name="location"
              required
              className="outline-none bg-transparent w-full p-2"
              placeholder="Enter location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
            <img src={LocationIcon} alt="Location Icon" />
          </div>
        </label>

        {/* Alt Text Input */}
        <label className="flex flex-col gap-3">
          <span className="font-medium text-lg">Photo/Video Alt Text</span>
          <input
            name="content_alt"
            required
            className="bg-dark-300 p-4 outline-none"
            placeholder="Alt text for accessibility"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          className={`font-semibold py-3 px-[20px] bg-purple capitalize w-fit ml-auto rounded-lg ${
            isLoadingPost ? "opacity-80" : "opacity-100"
          }`}
        >
          {isLoadingPost ? "sharing post..." : "share post"}
        </button>
      </form>
    </section>
  );
}

export default CreatePost;
