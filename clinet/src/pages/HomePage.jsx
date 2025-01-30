import React, { useEffect } from 'react';
import SidBar from '../component/Sidbar/SidBar';
import MainContent from '../component/medleyoer/MainContent ';
import RightSidebar from '../component/RightSidebar/RightSidebar';
import CreatePost from '../store/CreatePost';
import UserStore from '../store/UserStore';
import { ThemeProvider } from '../ThemeProvider/ThemeContext';
import Layout from '../component/NavBar/Layout';
import CommentStore from '../store/CommentStore';
import { useParams } from 'react-router-dom';



const HomePage = () => {
    const {BlogListRequest}=CreatePost();
    const {UserListRequest}=UserStore();
  

   
    
    useEffect(()=>{
        (async()=>{
        await BlogListRequest()
        await UserListRequest()
   
     
    

        })()
    
    
    
      },[]);
    




    return (
      
        <ThemeProvider>
        <Layout>
        
   <div className="container-fluid  ">
 
       <div className="row"  style={{ paddingTop: "80px" }}>
      <SidBar/>
      <MainContent />
       <RightSidebar />
      </div>    
       </div>
     
            
       </Layout>
        </ThemeProvider>
       
    );
};

export default HomePage;