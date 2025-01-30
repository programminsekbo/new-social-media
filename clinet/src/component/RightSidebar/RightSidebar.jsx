import React from "react";
import Profile from "../profile/Profile";
import Follow from "../userFollow/Follow";
import { useTheme } from "../../ThemeProvider/ThemeContext";


const RightSidebar = () => {
   const { darkMode, toggleTheme } = useTheme();
  return (
   
    <aside className="col-md-3 col-12 "  style={{
     
      backgroundColor: darkMode ? " #06141d " : "#F8F9FA",  // Dynamically change background color
      color: darkMode ? "#ffffff" : "#000000",  // Dynamically change text color
      transition: "background-color 0.3s ease, color 0.3s ease", // Smooth transition
   
     
    }} >
<Profile/>

 
      {/* <h5>Messages</h5>
      {Array.from({ length: 3 }).map((_, index) => (
        <div key={index} className="d-flex align-items-center my-2">
          <img
            src="https://via.placeholder.com/40"
            alt="Message User"
            className="rounded-circle me-3"
            style={{ width: "40px", height: "40px" }}
          />
          <div>
            <h6 className="m-0">User {index + 1}</h6>
            <small>Last message...</small>
          </div>
        </div> 
      ))} */}
      <hr />



       <Follow/>



      {/* <h5>Requests</h5>
      {Array.from({ length: 2 }).map((_, index) => (
        <div key={index} className="d-flex align-items-center my-2">
          <img
            src="https://via.placeholder.com/40"
            alt="Request User"
            className="rounded-circle me-3"
            style={{ width: "40px", height: "40px" }}
          />
          <div>
            <h6 className="m-0">User {index + 1}</h6>
            <div>
              <button className="btn btn-sm btn-success me-2">Accept</button>
              <button className="btn btn-sm btn-danger">Decline</button>
            </div>
          </div>
        </div>
      ))} */}
    </aside>
   
  );
};

export default RightSidebar;






// const handleSave = async (postId, event) => {
//   event?.preventDefault();

//   // Check if the text is not empty before proceeding
//   if (!CommentBlogFormValue.text.trim()) {
//     toast.error("Please enter a comment.");
//     return; // Prevent the request from being sent
//   }

//   if (!postId) {
//     console.error("Post ID is undefined");
//     return;
//   }

//   try {
//     const requestData = { ...CommentBlogFormValue, postId };
//     console.log("Request Data: ", requestData);

//     let response = await CommentBlogRequest(requestData);

//     if (response?.status === "success") {
//       await CommentDetailsRequest();
//       toast.success("Comment created successfully!");
//       handleClose();
//     } else {
//       toast.error(response?.message || "Failed to create comment");
//     }
//   } catch (err) {
//     console.error("Error in handleSave:", err);
//     toast.error("Creating comment failed: " + (err?.message || "Unknown error"));
//   }
// };
