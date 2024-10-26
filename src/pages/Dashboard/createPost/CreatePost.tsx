import { FormEvent, useState } from "react";
import Img from "../../../../public/images/gall.svg";
import Img2 from "../../../../public/images/tubeimg.svg";
import { MdOutlineDeleteOutline } from "react-icons/md";
import {
  useCreatePostMutation as useAddPostMutation,
  useUploadFilesMutation as useSendFilesMutation,
} from "../../../redux/api/api";
import { useNavigate } from "react-router-dom";
import { imageFileTypes } from "../home/Home";

function NewPost() {
  const navigate = useNavigate();
  const [sendFiles, { isLoading: isFileUploading }] = useSendFilesMutation();
  const [addPost, { isLoading: isPostSharing }] = useAddPostMutation();
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [description, setDescription] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [altDescription, setAltDescription] = useState<string>("");
  const [mediaContent, setMediaContent] = useState<any>([]);

  function uploadMedia() {
    const formData = new FormData();
    formData.append("location", place);
    formData.append("content_alt", altDescription);
    selectedFiles.forEach((file) => {
      formData.append("files", file, file.name);
    });

    sendFiles(formData)
      .unwrap()
      .then((response) => {
        const fileUrls = response.files
          .flat()
          .map((file: { url: string }) => file.url);
        const content = fileUrls.map((url: string) => {
          const isImage = imageFileTypes.some((type) => url.includes(type));
          console.log(response);
          return { url, type: isImage ? "IMAGE" : "VIDEO" };
        });
        setMediaContent(content);
      });
  }

  function submitPost(e: FormEvent) {
    e.preventDefault();
    const postDetails = {
      content: mediaContent,
      location: place,
      content_alt: altDescription,
      caption: description,
    };

    addPost(postDetails)
      .unwrap()
      .then(() => navigate("/"));
  }

  return (
    <section className="w-full h-screen overflow-y-auto py-[80px] px-[60px] bg-black text-white">
      <div className="flex items-center gap-[20px] mb-[50px]">
        <span className="scale-150">
          <img src={Img} alt="Create Post" />
        </span>
        <p className="text-4xl font-bold">Create a Post</p>
      </div>
      <form onSubmit={submitPost} className="flex flex-col gap-4">
        {/* Caption Input */}
        <span className="font-medium text-lg">Caption</span>
        <label className="flex flex-col gap-3">
          <textarea
            required
            rows={4}
            name="description"
            className="bg-dark-300 resize-none p-4 outline-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </label>

        {/* Media Upload Section */}
        <span className="font-medium text-lg">Add Photos/Videos</span>
        <label className="flex flex-col gap-3 relative cursor-pointer">
          {selectedFiles.length ? (
            <div className="bg-dark-300 w-full flex-wrap flex gap-3 p-10 cursor-pointer">
              {selectedFiles.map((file, index) => {
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
                        setSelectedFiles(
                          selectedFiles.filter((_, i) => i !== index)
                        )
                      }
                    >
                      <MdOutlineDeleteOutline />
                    </button>
                  </div>
                );
              })}
              <div className="absolute right-3 bottom-3 flex items-center space-x-5">
                <button
                  type="button"
                  className="font-semibold py-3 h-fit px-[20px] bg-purple w-fit mt-auto ml-auto rounded-lg"
                  onClick={uploadMedia}
                >
                  {isFileUploading ? "Uploading..." : "Upload"}
                </button>
              </div>
            </div>
          ) : (
            <div className="bg-dark-300 py-[48px] relative">
              <div className="flex flex-col items-center justify-center">
                <img src={Img2} alt="Import Files" />
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
                      setSelectedFiles(Array.from(e.target.files || []))
                    }
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

        {/* Location Input */}
        <label className="flex flex-col gap-3">
          <span className="font-medium text-lg">Add Location</span>
          <div className="bg-dark-300 flex items-center p-2 justify-between">
            <input
              name="place"
              required
              className="outline-none bg-transparent w-full p-2"
              value={place}
              onChange={(e) => setPlace(e.target.value)}
            />
          </div>
        </label>

        <label className="flex flex-col gap-3">
          <span className="font-medium text-lg">Photo/Video Alt Text</span>
          <input
            name="altDescription"
            required
            className="bg-dark-300 p-4 outline-none"
            value={altDescription}
            onChange={(e) => setAltDescription(e.target.value)}
          />
        </label>

        <button
          type="submit"
          className={`font-semibold py-3 px-[20px] bg-purple capitalize w-fit ml-auto rounded-lg ${
            isPostSharing ? "opacity-80" : "opacity-100"
          }`}
        >
          {isPostSharing ? "Sharing Post..." : "Share Post"}
        </button>
      </form>
    </section>
  );
}

export default NewPost;
