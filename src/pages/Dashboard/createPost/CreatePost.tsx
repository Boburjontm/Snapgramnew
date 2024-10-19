import { FormEvent, useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import {CreatePostIcon,ImportFilesIcon,} from "../../../../public/images";
import {useCreatePostMutation,useUploadFilesMutation,} from "../../../redux/api/users-api";
import { useNavigate } from "react-router-dom";

function CreatePost() {
  const navigate = useNavigate();
  const [uploadFiles, { isLoading }] = useUploadFilesMutation();
  const [createPost, { isLoading: isLoadingPost }] = useCreatePostMutation();
  const [imagesOrVideos, setImagesOrVideos] = useState<File[]>([]);
  const [caption, setCaption] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [altText, setAltText] = useState<string>("");
  const [saveImages, setSaveImages] = useState<string[]>([]);

  function handleUpload() {
    const formData = new FormData();
    formData.append("location", location);
    formData.append("content_alt", altText);
    imagesOrVideos.forEach((img) => {
      formData.append("files", img, img.name);
    });

    uploadFiles(formData)
      .unwrap()
      .then((res) => {
        setSaveImages(res.files.map((item: any) => item[0].url));
      });
  }

  function handleFormSubmit(e: FormEvent) {
    e.preventDefault();
    const data = {
      content: [...saveImages],
      location,
      content_alt: altText,
      caption,
    };

    createPost(data)
      .unwrap()
      .then(() => navigate("/"));
  }

  return (
    <section className="w-full h-full lg:h-screen overflow-y-auto py-8 px-4 md:px-[60px] bg-black text-white">
      <div className="flex items-center gap-4 mb-8 md:gap-[20px] md:mb-[50px]">
        <span className="scale-125 md:scale-150">
          <CreatePostIcon />
        </span>
        <p className="text-2xl md:text-4xl font-bold">Create a Post</p>
      </div>
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-6 md:gap-9">
        <label className="flex flex-col gap-2 md:gap-3">
          <span className="font-medium text-lg">Caption</span>
          <textarea
            required
            rows={3}
            name="caption"
            className="bg-dark-300 resize-none p-3 md:p-4 outline-none"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
          ></textarea>
        </label>
        <label className="flex flex-col gap-2 md:gap-3 relative">
          <span className="font-medium text-lg">Add Photos/Videos</span>
          {imagesOrVideos.length ? (
            <div className="bg-dark-300 w-full flex-wrap flex gap-3 p-4 md:p-10">
              {imagesOrVideos.map((i, inx) => {
                const mediaUrl = URL.createObjectURL(i);
                return (
                  <div className="relative" key={inx}>
                    {i.type.includes("video") ? (
                      <video
                        src={mediaUrl}
                        controls
                        className="object-contain w-full max-w-[300px] h-auto"
                      />
                    ) : (
                      <img
                        className="object-contain w-full max-w-[300px] h-auto"
                        src={mediaUrl}
                        alt={`media-${inx}`}
                      />
                    )}
                    <button
                      type="button"
                      className="absolute bottom-0 right-0 bg-red-500 text-white p-2 rounded-xl"
                      onClick={() =>
                        setImagesOrVideos(imagesOrVideos.filter((_, index) => index !== inx))
                      }
                    >
                      <MdDeleteOutline />

                    </button>
                  </div>
                );
              })}
              <div className="absolute right-3 bottom-3 flex items-center space-x-3 md:space-x-5">
                <button
                  type="button"
                  className="font-semibold py-2 px-4 md:py-3 md:px-[20px] bg-purple w-fit mt-auto ml-auto rounded-lg"
                  onClick={handleUpload}
                >
                  {isLoading ? "Uploading..." : "Upload"}
                </button>
               
              </div>
            </div>
          ) : (
            <div className="bg-dark-300 py-6 md:py-[48px] relative">
              <div className="flex flex-col items-center justify-center">
                <ImportFilesIcon />
                <h1 className="text-md md:text-lg font-semibold mt-3 mb-2">
                  Drag photos and videos here
                </h1>
             
                <label htmlFor="chooseFile" className="mt-4 cursor-pointer">
                  <span className="text-xs font-semibold py-2 px-4 md:py-[10px] md:px-[20px] rounded-lg bg-dark-400">
                    Select from computer
                  </span>
                  <input
                    onChange={(e) => setImagesOrVideos(Array.from(e.target.files || []))}
                    type="file"
                    id="chooseFile"
                    hidden
                    accept="image/*, video/*"
                    multiple
                  />
                </label>
              </div>
              
            </div>
          )}
        </label>
        <label className="flex flex-col gap-2 md:gap-3">
          <span className="font-medium text-lg">Add Location</span>
          <div className="bg-dark-300 flex items-center p-2 justify-between">
            <input
              name="location"
              required
              className="outline-none bg-transparent w-full p-2"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
            />
          </div>
        </label>
        <label className="flex flex-col gap-2 md:gap-3">
          <span className="font-medium text-lg">Photo/Video Alt Text</span>
          <input
            name="content_alt"
            required
            className="bg-dark-300 p-3 md:p-4 outline-none"
            value={altText}
            onChange={(e) => setAltText(e.target.value)}
          />
        </label>
        <button
          type="submit"
          className={`font-semibold py-2 px-4 md:py-3 md:px-[20px] bg-purple capitalize w-fit ml-auto rounded-lg ${
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
