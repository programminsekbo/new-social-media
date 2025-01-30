import axios from "axios";

import { create } from "zustand";


const CommentStore =  create(set => ({
  
 
  CommentDetails : null,


  CommentDetailsRequest: async (postId) => {
    try {
      const response = await axios.get(`/api/getCommentsByPost/${postId}`);
      console.log("API Response: ", response.data); // Log the entire response
  
      if (response.data.status === "success") {
        set({ CommentDetails: response.data.data }); // Update with the actual comments data
      } else {
        console.error("Error in response:", response.data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  },


  // Create a new blog
  CommentBlogFormValue : {text : '', },

  CommentBlogFormOnChange : (name, value) => {
      set((state) => ({
        CommentBlogFormValue: {
              ...state.CommentBlogFormValue,
              [name]: value
          }
      }))
  },



  

  CommentBlogRequest : async (payload) => {
    try {
     
      const response = await axios.post('/api/createComment', payload);
      
    } catch (error) {
      console.error("Error registering user:", error.response ? error.response.data : error.message);
    }
  },






}));

export default CommentStore;
