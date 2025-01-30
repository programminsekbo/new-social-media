import React, { useState } from "react";
import NevBar from "./NevBar";
import { ThemeProvider } from "../../ThemeProvider/ThemeContext";


const Layout = props => {

  const [darkMode, setDarkMode] = useState(false);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };


  return (
    <ThemeProvider value={{ darkMode, toggleTheme }}>
      <div className={darkMode ? "dark-theme" : "light-theme"}>
     
        <NevBar />
        {props.children}
      
      </div>
      </ThemeProvider>
  );
};

export default Layout;
