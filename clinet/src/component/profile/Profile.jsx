import React, { useEffect, useState } from "react";

import { useTheme } from "../../ThemeProvider/ThemeContext";
import axios from "axios";
import UserStore from "../../store/UserStore";
import { Button, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";

const Profile = () => {

  const { darkMode } = useTheme();
  const [ProfileList, setProfileList] = useState(null);
// নতুন state ডিক্লেয়ার করা হলো
const [loading, setLoading] = useState(true);















//sidebar 


const {
  
  UpdaterFormValue,
  UpdateFormOnChange,
  UpdateRequest,
  UserListRequest,
} = UserStore();

const [show, setShow] = useState(false);

const handleClose = () => setShow(false);
const handleShow = () => setShow(true);





  // Cloudinary Upload Function
  const uploadToCloudinary = async (file) => {
    const formData = new FormData();
    formData.append("file", file); // File to upload
  
      formData.append("upload_preset", "First_time_using_cloudinary"); 
      formData.append("cloud_name", "db2huzwrx"); 
  
    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/db2huzwrx/image/upload",
        formData
      );
      return response.data.secure_url; // Return the secure URL of the uploaded image
    } catch (error) {
      toast.error("Image upload failed");
      console.error(error);
      return null;
    }
  };






// const handleSave = async () => {
// // Ensure that postBody is defined properly
// const postBody = {};  // Initialize an empty object to store the updated data

// // Filter out empty or undefined fields
// Object.keys(UpdaterFormValue).forEach(key => {
//   if (UpdaterFormValue[key] !== undefined && UpdaterFormValue[key] !== '') {
//     postBody[key] = UpdaterFormValue[key];
//   }
// });

// // Check if the postBody has any data to send
// if (Object.keys(postBody).length === 0) {
//   toast.error("No data to update");
//   return;
// }

// try {
//   // Send the filtered data (postBody) to the API
//   let response = await UpdateRequest(postBody);



//   if (response.status === "success") {
//     // Directly update ProfileList with the new data
//     setProfileList((prevProfileList) => ({
//       ...prevProfileList,
//       ...postBody,
//     }));

//     toast.success("Profile Updated Successfully");
//     await UserListRequest();
//     handleClose(); // Close the modal
//   } else {
//     toast.error("Profile Update Failed");
//   }
// } catch (err) {
//   toast.error("Update failed: " + err.message);
// }


// };




  // Save Profile
  const handleSave = async () => {
    const postBody = {};

    // Filter out empty or undefined fields
    Object.keys(UpdaterFormValue).forEach((key) => {
      if (UpdaterFormValue[key] !== undefined && UpdaterFormValue[key] !== "") {
        postBody[key] = UpdaterFormValue[key];
      }
    });

    if (UpdaterFormValue.profilePicture instanceof File) {
      const profileImageUrl = await uploadToCloudinary(
        UpdaterFormValue.profilePicture
      );
      if (profileImageUrl) postBody.profilePicture = profileImageUrl;
    }

    if (UpdaterFormValue.coverPicture instanceof File) {
      const coverImageUrl = await uploadToCloudinary(
        UpdaterFormValue.coverPicture
      );
      if (coverImageUrl) postBody.coverPicture = coverImageUrl;
    }

    if (Object.keys(postBody).length === 0) {
      toast.error("No data to update");
      return;
    }

    try {
      const response = await UpdateRequest(postBody);

      if (response.status === "success") {
        setProfileList((prevProfileList) => ({
          ...prevProfileList,
          ...postBody,
        }));
        toast.success("Profile Updated Successfully");
        await UserListRequest();
        handleClose();
      } else {
        toast.error("Profile Update Failed");
      }
    } catch (err) {
      toast.error("Update failed: " + err.message);
    }
  };















 //mainbar


  const ProfileRequest = async () => {
    try {
      const response = await axios.get("/api/getProfile");


      // Check if data exists
      if (response.data) {
        setProfileList(response.data); // Set profile data into the state
        setLoading(false); // Set loading to false once data is fetched
      } else {
        console.error("Error fetching user data: No data available");
        setLoading(false); // Set loading to false in case of error
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
      setLoading(false); // Set loading to false in case of an error
    }
  };



  useEffect(() => {
    (async () => {
      await ProfileRequest();
    })(); // Call the profile request when the component mounts
  },  []);






if (!ProfileList) {
  return <h1>No profile data available.</h1>;
}
  return (
    <div
      className="container my-5"
      style={{
        paddingRight: "30px",
        paddingLeft: "0px",
        backgroundColor: darkMode ? "#06141d" : "#F8F9FA",
        color: darkMode ? "#ffffff" : "#000000",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      <div
        className="card mx-auto shadow-lg"
        style={{
          backgroundColor: darkMode ? "#1a2730" : "#FFFFFF",
          color: darkMode ? "#ffffff" : "#000000",
          transition: "background-color 0.3s ease, color 0.3s ease",
        }}
      >
        {/* Cover Photo */}
        <img
          src={ProfileList.coverPicture || "default-cover.jpg"}
          alt="Cover"
          className="cover-photo"
          style={{
            height: "150px",
            position: "relative",
            background: "linear-gradient(to right, #ff8c00, #ff6f00)",
            borderTopLeftRadius: "10px",
            borderTopRightRadius: "10px",
          }}
        />

        {/* Profile Photo */}
        <div
          className="profile-photo-wrapper"
          style={{
            position: "relative",
            top: "-50px",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <img
            src={ProfileList.profilePicture || "default-profile.jpg"}
            alt="Profile"
            className="profile-photo shadow"
            style={{
              width: "100px",
              height: "100px",
              borderRadius: "50%",
              border: "4px solid white",
            }}
          />
        </div>

        {/* Card Body */}
        <div
          className="card-body text-center "
          style={{
            backgroundColor: darkMode ? "#1a2730" : "#FFFFFF",
            color: darkMode ? "#ffffff" : "#000000",
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
        >
          <h5 className="card-title fw-bold ">
            {ProfileList.firstName} {ProfileList.lastName}
          </h5>
          {ProfileList ? (
            <p className="small mb-3">
              Following:{" "}
              <span className="fw-bold">{ProfileList.followingCount || 0}</span>{" "}
              | Followers:{" "}
              <span className="fw-bold">{ProfileList.followersCount || 0}</span>
            </p>
          ) : (
            <p className="small mb-3">
              No followers or following data available
            </p>
          )}

          {/* <p className="small mb-3">
            Following:{" "}
            <span className="fw-bold">{ProfileList.following?.length || 0} </span> |
            Followers:{" "}
            <span className="fw-bold">{ProfileList.followers?.length || 0} </span>
          </p> */}
          <p>{ProfileList.bio || "No bio available"}</p>

          {/* Buttons */}
          <div className="d-flex flex-wrap justify-content-center gap-2">
            
            <button className="btn btn-outline-secondary rounded-pill px-4"  onClick={handleShow}>
             Eddit Profile
            </button>
          </div>
        </div>

        {/* Pictures Section */}
        <div
          className="card-footer"
          style={{
            backgroundColor: darkMode ? "#1a2730" : "#FFFFFF",
            color: darkMode ? "#ffffff" : "#000000",
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
        >
          <h6 className="fw-bold mb-3">Pictures</h6>
          <div className="row row-cols-2 row-cols-md-4 g-2">
            {/* Picture 1 */}
            <div className="col-3">
              <img
                src={ProfileList.profilePicture || "default-profile.jpg"}
                alt="Picture 1"
                className="img-fluid rounded"
                style={{
                  objectFit: "cover",
                  height: "75px",
                  width: "100%",
                }}
              />
            </div>
            {/* Picture 2 */}
            <div className="col-3">
              <img
                src={ProfileList.coverPicture || "default-cover.jpg"}
                alt="Picture 2"
                className="img-fluid rounded"
                style={{
                  objectFit: "cover",
                  height: "75px",
                  width: "100%",
                }}
              />
            </div>
          </div>
        </div>
      </div>






      
      <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create New Blog</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formBlogTitle" className="mb-3">
                <Form.Label>First Name</Form.Label>
                <Form.Control
                  value={UpdaterFormValue.firstName}
                  onChange={event => {
                    UpdateFormOnChange("firstName", event.target.value);
                  }}
                  type="text"
                  placeholder="Enter Your FirstName"
                />
              </Form.Group>

              <Form.Group controlId="formBlogTitle" className="mb-3">
                <Form.Label> Last Name</Form.Label>
                <Form.Control
                  value={UpdaterFormValue.lastName}
                  onChange={event => {
                    UpdateFormOnChange("lastName", event.target.value);
                  }}
                  type="text"
                  placeholder="Enter Your LastName"
                />
              </Form.Group>

              <Form.Group controlId="formShortDescription" className="mb-3">
                <Form.Label>Enter Your bio</Form.Label>
                <Form.Control
                  value={UpdaterFormValue.bio}
                  onChange={event => {
                    UpdateFormOnChange("bio", event.target.value);
                  }}
                  as="textarea"
                  rows={2}
                  placeholder="Enter Your bio"
                />
              </Form.Group>

              <Form.Group controlId="formImageUpload" className="mb-3">
                <Form.Label>Upload Profile Picture</Form.Label>
                <Form.Control
                  //value={UpdaterFormValue.profilePicture}
                  onChange={(e) => UpdateFormOnChange("profilePicture", e.target.files[0])}
                     type="file"
                  placeholder="Enter img URL"
                />
              </Form.Group>

              <Form.Group controlId="formImageUpload" className="mb-3">
                <Form.Label>Upload Cover Picture</Form.Label>
                <Form.Control
                 // value={UpdaterFormValue.coverPicture}
                  type="file"
                  onChange={(e) => UpdateFormOnChange("coverPicture", e.target.files[0])}
                
          
                  placeholder="Enter img URL"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save Blog
            </Button>
          </Modal.Footer>
        </Modal>
    </div>
  );
};

export default Profile;








