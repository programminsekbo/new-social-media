import React, { useEffect, useState } from 'react';
import { FaSearch, FaBell,  FaPlus } from "react-icons/fa";
import { useTheme } from '../../ThemeProvider/ThemeContext';

import { MdOutlineDarkMode } from "react-icons/md";
import logo from '../../assets/images/social-media-word-in-rectangles-background-2CAGTWB.jpg'
import axios from 'axios';
import { Link } from 'react-router-dom';

const NevBar = () => {

 

  const { darkMode, toggleTheme } = useTheme();

 

  const [ProfileList, setProfileList] = useState(null);
  
  const [loading, setLoading] = useState(true); 
 
   const ProfileRequest = async () => {
   try {
     const response = await axios.get('/api/getProfile');
 
   
      // Check if data exists
    if (response.data) {
       setProfileList(response.data);  // Set profile data into the state
        setLoading(false);  // Set loading to false once data is fetched
       } else {
        console.error('Error fetching user data: No data available');
       setLoading(false);  // Set loading to false in case of error
    }
    } catch (error) {
     console.error('Error fetching user data:', error);
      setLoading(false);  // Set loading to false in case of an error
    }
  };
   
   useEffect(() => {
    (async()=>{
  await  ProfileRequest();
 
    })()  // Call the profile request when the component mounts
   }, []);
 





    return (
        <header className="d-flex justify-content-between align-items-center p-3  fixed-top border-bottom " style={{
          backgroundColor: darkMode ? "#06141d" : "#FFFFFF",  // Dynamically change background color
          color: darkMode ? "#ffffff" : "#000000",  // Dynamically change text color
          transition: "background-color 0.3s ease, color 0.3s ease", // Smooth transition
       
        }} >
        <div className="d-flex align-items-center">

        <Link
        to="/Home"
        className="text-decoration-none"
        style={{
          fontSize: "26px",
          fontWeight: "bold",
          color: darkMode ? "#ff6a00" : "#ff6a00", // Dark mode: White, Light mode: Black
          textTransform: "uppercase",
          letterSpacing: "2px",
          transition: "0.3s",
          paddingLeft:"50px"
        }}
        onMouseEnter={(e) =>
          (e.target.style.transform = "scale(1.1) rotate(2deg)")
        }
        onMouseLeave={(e) => (e.target.style.transform = "scale(1)" )}

      >
        RK-WebSite
      </Link>

{/* 
              <img src={logo} alt="logo"  className="img-fluid" 
    style={{ maxWidth: "250px", height: "auto" ,paddingLeft:"50px"}}   /> */}


          {/* <h1 className="logo m-0  text-secondary  fst-italic fw-bolder"></h1> */}
        </div>
        <div className="search-bar mx-3"style={{ width: "30%" }}>
          <div className="input-group">
            <span className="input-group-text ">
              <FaSearch />
            </span>
            <input type="text" className="form-control" placeholder="Search..." />
          </div>
        </div>
        <div className="profile-icon d-flex align-items-center">
          <FaPlus className="mx-2" size={20} />
         
          <span onClick={toggleTheme} >
          <MdOutlineDarkMode className="mx-2" size={25} />
      </span>

          

     


          { ProfileList===null ? (
  
  <div>No users found</div> // যদি কোন ডেটা না থাকে
 
) : (

  <div >
  <img
      src={ProfileList.profilePicture || "https://placehold.co/40x40?text=No+Image"}
    alt="Profile"
    className="rounded-circle me-3"
    width="40"
    height="40"
  />
</div>

 
)}









        
        



        
        </div>
      </header>

    );
};

export default NevBar;