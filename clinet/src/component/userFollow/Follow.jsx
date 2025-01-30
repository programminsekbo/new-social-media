import React, { useState } from 'react';
import axios from 'axios'; // Added axios import
import { CiSearch } from "react-icons/ci";
import UserStore from '../../store/UserStore';
import { useTheme } from '../../ThemeProvider/ThemeContext';
import toast from 'react-hot-toast';

const Follow = () => {
  const { UserList,UserProfileRequest } = UserStore();
  const { darkMode, toggleTheme } = useTheme();



  const [followingStatus, setFollowingStatus] = useState({});


 

  // Handle follow action
  const handleFollow = async (userId) => {
    try {
      await axios.post(`/api/followUserController/${userId}`);
      setFollowingStatus((prev) => ({ ...prev, [userId]: true }));
      toast.success("Followed successfully!");
      await UserProfileRequest();
    } catch (error) {
      console.error("Failed to follow:", error);
    }
  };

  // Handle unfollow action
  const handleUnfollow = async (userId) => {
    try {
      await axios.post(`/api/unfollowUserController/${userId}`);
      setFollowingStatus((prev) => ({ ...prev, [userId]: false }));
      toast.success("Unfollowed successfully!");
      await UserProfileRequest();
    } catch (error) {
      console.error("Failed to unfollow:", error);
    }
  };






  if (!UserList || UserList.length === 0) {
    return <h1>No users to follow</h1>;
  }

  return (
    <div className="container my-4 "  style={{  paddingRight: "30px", paddingLeft: "0px", }} >
      {/* Search Box */}
      <div className="mb-4">
        <div className="input-group">
          <span className="input-group-text bg-#FFFFFF border-0">
            <CiSearch size="20px" style={{ backgroundColor: "#FFFFFF", }}/>
          </span>
          <input
            type="text"
            className="form-control border-0 bg-#FFFFFF"
            placeholder="Search"
          />
        </div>
      </div>

      {/* Who to Follow Section */}
      <div className="card p-3 overflow-scroll"  style={{
    backgroundColor: darkMode ? "#1a2730" : "#FFFFFF",  // Dynamically change background color
    color: darkMode ? "#ffffff" : "#000000",  // Dynamically change text color
    transition: "background-color 0.3s ease, color 0.3s ease", // Smooth transition
  }}>
        <h1 className="h5 fw-bold text-truncate">Who to follow</h1>

        {UserList.map((user, index) => (
          <div
            key={index}
            className="d-flex align-items-center justify-content-between flex-wrap my-3"
          >
            {/* User Image & Info */}
            <div className="d-flex align-items-center flex-wrap">
              {/* User Image */}
              <div className="me-2">
                <img
                  src={user.profilePicture || "https://placehold.co/40x40?text=No+Image"}
                  alt="Profile"
                  className="rounded-circle"
                  width="40"
                  height="40"
                />
              </div>
              {/* User Info */}
              <div className="text-truncate" style={{ maxWidth: "120px" }}>
                <h1 className="h6 fw-bold mb-0 text-truncate">{user.firstName} {user.lastName}</h1>
                <p className="small text-muted mb-0 text-truncate">
                  {user.bio}
                </p>
              </div>
            </div>

            {/* Follow/Unfollow Button */}
            <div className="flex-shrink-0 mt-2 mt-md-0">
              {followingStatus[user.id] ? (
                <button
                  className="btn btn-outline-danger btn-sm rounded-pill w-100"
                  onClick={() => handleUnfollow(user.id)}
                 
                >
                  Unfollow
                </button>
              ) : (
                <button
                  className="btn btn-primary btn-sm rounded-pill w-100"
                  onClick={() => handleFollow(user.id)}
                
                >
                  Follow
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Follow;
