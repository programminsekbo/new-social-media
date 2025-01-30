import React, { useEffect, useState } from "react";
import { CiImageOn } from "react-icons/ci";
import CreatePost from "../../store/CreatePost";

import toast from "react-hot-toast";

import { useTheme } from "../../ThemeProvider/ThemeContext";
import axios from "axios";
import UserStore from "../../store/UserStore";

const MentPost = () => {
  const {
    BlogList,
    CreateBlogFormValue,
    CreateBlogFormOnChange,
    CreateBlogRequest,
    BlogListRequest,
  } = CreatePost();
const{ProfileList}=UserStore()

  const { darkMode, toggleTheme } = useTheme();

  const handleSave = async () => {
    const postBody = { ...CreateBlogFormValue };

    if (postBody.image) {
      // Image ase, Cloudinary te upload korte hobe
      const formData = new FormData();
      formData.append("file", postBody.image);
      formData.append("upload_preset", "First_time_using_cloudinary");
      formData.append("cloud_name", "db2huzwrx");

      try {
        const uploadResponse = await axios.post(
          `https://api.cloudinary.com/v1_1/db2huzwrx/image/upload`,
          formData
        );

        postBody.image = uploadResponse.data.secure_url;
      } catch (error) {
        toast.error("Image upload failed!", error.message);
        return;
      }
    } else {
      postBody.image = "";
    }

    try {
      const response = await CreateBlogRequest(postBody);

      if (response.status === "success") {
        await BlogListRequest();
        toast.success("Post Created Successfully!");

        // Form reset korte hobe
        CreateBlogFormOnChange("caption", "");
        CreateBlogFormOnChange("image", "");
      } else {
        toast.error("Post Creation Failed!");
      }
    } catch (error) {
      toast.error("Error creating post", error.message);
    }
  };

  // const [ProfileList, setProfileList] = useState(null);

  // const [loading, setLoading] = useState(true);

  // const ProfileRequest = async () => {
  //   try {
  //     const response = await axios.get("/api/getProfile");

  //     // Check if data exists
  //     if (response.data) {
  //       setProfileList(response.data); // Set profile data into the state
  //       setLoading(false); // Set loading to false once data is fetched
  //     } else {
  //       console.error("Error fetching user data: No data available");
  //       setLoading(false); // Set loading to false in case of error
  //     }
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //     setLoading(false); // Set loading to false in case of an error
  //   }
  // };

  // useEffect(() => {
  //   (async () => {
  //     await ProfileRequest();
  //   })(); // Call the profile request when the component mounts
  // }, []);

  return (
    <div
      className=" border my-3 "
      style={{
        backgroundColor: darkMode ? "#1a2730" : "#FFFFFF", // Dynamically change background color
        color: darkMode ? "#ffffff" : "#000000", // Dynamically change text color
        transition: "background-color 0.3s ease, color 0.3s ease", // Smooth transition
      }}
    >
      <div>
        <div className="d-flex align-items-center p-3 ">
          {ProfileList === null ? (
            <div>No users found</div> 
          ) : (
            <div>
              <img
                src={
                  ProfileList.profilePicture ||
                  "https://placehold.co/40x40?text=No+Image"
                }
                alt="Profile"
                className="rounded-circle me-3"
                width="55"
                height="55"
              />
            </div>
          )}

          <input
            value={CreateBlogFormValue.caption}
            onChange={event => {
              CreateBlogFormOnChange("caption", event.target.value);
            }}
            className="w-100  form-control form-control-lg ml-2"
            type="text"
            placeholder="What is happening?!"
            style={{
              backgroundColor: darkMode ? "#F9F9F8" : "#F9F9F8",
              color: darkMode ? "#000000" : "#000000",
              border: "1px solid #6c757d",
              borderRadius: "200px",
             
              outline: "none",
              transition: "0.3s",
            }}
            
          />
        </div>

        <div className="d-flex flex-wrap align-items-center justify-content-between p-4 border-bottom border-secondary">
          <div className="d-flex align-items-center flex-grow-1 me-3">
            <label htmlFor="imageInput" className="form-label me-2">
              <CiImageOn size="50px" className="text-primary mt-2" />
            </label>

            <input
              onChange={event => {
                CreateBlogFormOnChange("image", event.target.files[0]);
              }}
              id="imageInput"
              placeholder="Upload Your Image?!"
              className="form-control"
              //style={{ maxWidth: "300px", flexGrow: 1 }}
              type="file"

              style={{
                backgroundColor: darkMode ? "#1e2a38" : "#ffffff",
                color: darkMode ? "#ffffff" : "#000000",
                border: "1px solid #6c757d",
                borderRadius: "15px",
                outline: "none",
                transition: "0.3s",
                maxWidth: "300px",
              }}
            />
          </div>
          <button
            onClick={handleSave}
            className="btn btn-primary px-4 py-1 mt-2 mt-md-0 text-lg text-white rounded-pill btn btn-outline-info   w-md-auto"
            type="submit"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default MentPost;
