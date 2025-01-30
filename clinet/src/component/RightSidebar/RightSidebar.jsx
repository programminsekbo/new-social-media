import React from "react";
import Profile from "../profile/Profile";
import Follow from "../userFollow/Follow";
import { useTheme } from "../../ThemeProvider/ThemeContext";

const RightSidebar = () => {
  const { darkMode, toggleTheme } = useTheme();
  return (
    <aside
      className="col-md-3 col-12 "
      style={{
        backgroundColor: darkMode ? " #06141d " : "#F8F9FA", // Dynamically change background color
        color: darkMode ? "#ffffff" : "#000000", // Dynamically change text color
        transition: "background-color 0.3s ease, color 0.3s ease", // Smooth transition
      }}
    >
      <Profile/>

      <hr />

      <Follow />
    </aside>
  );
};

export default RightSidebar;
