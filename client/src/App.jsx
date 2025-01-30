import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import RegistrationPage from './pages/RegistrationPage';
import LogingPage from './pages/LogingPage';
import OtpVerifisonPage from './pages/OtpVerifisonPage';
import HomePage from './pages/HomePage';
import UserUpProfilePage from './pages/UserUpProfilePage';





const App = () => {
  return (




<BrowserRouter>

 <Routes>



 <Route  path='/'  element={<RegistrationPage/>}/>
 <Route  path='/Login'  element={<LogingPage/>}/>
 <Route  path='/Verification'  element={<OtpVerifisonPage/>}/>
 <Route  path='/Home'  element={<HomePage/>}/> 
 <Route  path='/UpDateProfile'  element={<UserUpProfilePage/>}/> 









 </Routes>




</BrowserRouter>
























  );
};

export default App;