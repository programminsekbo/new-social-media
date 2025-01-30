import React, { useState } from "react";
import { CgProfile } from "react-icons/cg";
import {
  FaHome,
  FaBell,
  FaUserFriends,
  FaCog,
  FaEnvelope,
} from "react-icons/fa";
import { RiLogoutCircleRLine } from "react-icons/ri";
import { useTheme } from "../../ThemeProvider/ThemeContext";
import { Link, useNavigate } from "react-router-dom";
import UserStore from "../../store/UserStore";
import Cookies from "js-cookie";
import { Button, Form, Modal } from "react-bootstrap";
import toast from "react-hot-toast";


const SidBar = () => {
  const navigate = useNavigate();
  const { LogoutRequest } = UserStore();
  const { darkMode, toggleTheme } = useTheme();


  const {
    
    UpdaterFormValue,
    UpdateFormOnChange,
    UpdateRequest,
    UserListRequest,
  } = UserStore();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSave = async () => {
  // Ensure that postBody is defined properly
  const postBody = {};  // Initialize an empty object to store the updated data

  // Filter out empty or undefined fields
  Object.keys(UpdaterFormValue).forEach(key => {
    if (UpdaterFormValue[key] !== undefined && UpdaterFormValue[key] !== '') {
      postBody[key] = UpdaterFormValue[key];
    }
  });

  // Check if the postBody has any data to send
  if (Object.keys(postBody).length === 0) {
    toast.error("No data to update");
    return;
  }

  try {
    // Send the filtered data (postBody) to the API
    let response = await UpdateRequest(postBody);



    if (response.status === "success") {
      await UserListRequest(); // Reload user list after successful update
      toast.success("Profile Updated Successfully");
      handleClose(); // Close the modal
      await ProFileRequest(); 
     
    } else {
      toast.error("Profile Update Failed");
    }
  } catch (err) {
    toast.error("Update failed: " + err.message);
  }
  };




  

  const onLogout = async () => {
    await LogoutRequest();
    Cookies.remove("token");
    sessionStorage.clear();
    localStorage.clear();
    navigate("/Login");
  };

  return (
    <>
      {/* Sidebar */}
      <aside
        className="col-md-3 col-12"
        style={{
          paddingLeft: "50px",
          paddingTop: "30px",
          paddingRight: "30px",
          backgroundColor: darkMode ? "#06141d" : "#F8F9FA", // Dynamically change background color
          color: darkMode ? "#ffffff" : "#000000", // Dynamically change text color
          transition: "background-color 0.3s ease, color 0.3s ease", // Smooth transition
        }}
      >
        <ul className="nav flex-column">
          <li className="nav-item my-2">
            <Link
              href="/Home"
              className="nav-link btn btn-outline-secondary d-flex align-items-center justify-content-start"
              style={{
                color: darkMode ? "#ffffff" : "#000000",
     
              }}
            >
              <FaHome className="me-2" size={20} />
              Home
            </Link>
          </li>

          <li className="nav-item my-2">
            <button
              onClick={handleShow}
              href="/UpDateProfile"
              className="nav-link  btn btn-outline-secondary d-flex align-items-center justify-content-start w-100"   
              style={{
                color: darkMode ? "#ffffff" : "#000000",
                
              }}
            >
              <CgProfile className="me-2" size={20} />
               Profile
            </button>
          </li>

          <li className="nav-item my-2">
            <a
              href="#"
              className="nav-link btn btn-outline-secondary d-flex align-items-center justify-content-start"
              style={{
                color: darkMode ? "#ffffff" : "#000000",
              }}
            >
              <FaUserFriends className="me-2" size={20} />
              Explore
            </a>
          </li>

          <li className="nav-item my-2">
            <a
              href="#"
              className="nav-link btn btn-outline-secondary d-flex align-items-center justify-content-start"
              style={{
                color: darkMode ? "#ffffff" : "#000000",
              }}
            >
              <FaBell className="me-2" size={20} />
              Notifications
            </a>
          </li>

          <li className="nav-item my-2">
            <a
              href="#"
              className="nav-link btn btn-outline-secondary d-flex align-items-center justify-content-start"
              style={{
                color: darkMode ? "#ffffff" : "#000000",
              }}
            >
              <FaEnvelope className="me-2" size={20} />
              Messages
            </a>
          </li>

          <li className="nav-item my-2">
            <button
              onClick={onLogout}
              className="nav-link btn btn-outline-secondary d-flex align-items-center justify-content-start w-100"
              style={{
                color: darkMode ? "#ffffff" : "#000000",
              }}
            >
              <RiLogoutCircleRLine className="me-2" size={20} />
              Logout
            </button>
          </li>

          <li className="nav-item my-2">
            <a
              href="#"
              className="nav-link btn btn-outline-secondary d-flex align-items-center justify-content-start"
              style={{
                color: darkMode ? "#ffffff" : "#000000",
              }}
            >
              <FaCog className="me-2" size={20} />
              Settings
            </a>
          </li>
        </ul>
        <button className="btn btn-primary w-100 mt-4 w-70% btn btn-outline-info text-white  align-items-center  rounded-pill d-flex flex-wrap justify-content-center gap-2">
          Create Post
        </button>

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
                  value={UpdaterFormValue.profilePicture}
                  onChange={event => {
                    UpdateFormOnChange("profilePicture", event.target.value);
                  }}
                  type="text"
                  placeholder="Enter img URL"
                />
              </Form.Group>

              <Form.Group controlId="formImageUpload" className="mb-3">
                <Form.Label>Upload Cover Picture</Form.Label>
                <Form.Control
                  value={UpdaterFormValue.coverPicture}
                  onChange={event => {
                    UpdateFormOnChange("coverPicture", event.target.value);
                  }}
                  type="text"
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
      </aside>
    </>
  );
};

export default SidBar;





