import axios from "axios";
import { create } from "zustand";

const CreatePost = create(set => ({









  BlogList: null,


  
  BlogListRequest: async () => {
    const response = await axios.get("/api/getPost");
 
    if (response.data["status"] === "success") {
      set({ BlogList: response.data.data });
     
    }
    // const data = await response.data
  },





  BlogListDetails: null,
  BlogListDetailsRequest: async id => {
    const response = await axios.get(`/api/getBlogById/${id}`);
    const data = await response.data;
  },

  // Create a new blog
  CreateBlogFormValue: {
    caption: "",
    image: ""
  },

  CreateBlogFormOnChange: (name, value) => {
    set(state => ({
      CreateBlogFormValue: {
        ...state.CreateBlogFormValue,
        [name]: value,
      },
    }));
  },

  CreateBlogRequest: async postBody => {
    try {
      let response = await axios.post(`/api/createPost`, postBody);

      return response.data;
    } catch (e) {
      console.error("Error registering user:", e);
    }
  },










  // Remove a blog
  DeleteBlog: async (blogId) => {
    if (!blogId) {
      console.error("Blog ID is missing");
      return;
    }
  
    try {
      const currentUserId = "your-user-id"; // Replace this with the actual user ID
      const response = await axios.post(
        "/api/deletePost",  // Backend endpoint
        { id: blogId },  // Blog ID to delete
        { headers: { user_id: currentUserId } }  // Sending user_id in the headers
      );
  
     
      if (response.data.status === "success") {
        alert('Do you want to delete the post?');
        // Optionally, refresh the blog list or update UI accordingly
      } else {
        alert(response.data.message);  // Show the error message if deletion fails
      }
    } catch (e) {
      console.error("Error deleting blog:", e.response?.data || e.message);
      alert("Error deleting blog. Please try again.");
    }
  },
  





  // Remove a blog
  UpdateBlogRequest: async postBody => {
    try {
     const response= await axios.post(`/api/updatePost`, postBody);

    } catch (e) {
      console.error("Error updating:", e);
    }
  },
































  LikeListRequest: async (postId, currentUserId) => {
    try {
      const response = await axios.post(`/api/likePostController/${postId}`,  {
        userId: currentUserId, // Send user ID in the body if required
      });
      if (response.data.status === "success") {
        set((state) => ({
          BlogList: state.BlogList.map((post) =>
            post._id === postId
              ? { ...post, likes: [...post.likes, currentUserId] }
              : post
          ),
        }));
      }
      return response.data;
    } catch (error) {
      console.error("Error liking post:", error.message);
      throw error;
    }
},


UnLikeListRequest: async (postId, currentUserId) => {
  try {
    const response = await axios.post(`/api/unlikePostController/${postId}`, {
      userId: currentUserId, // Send user ID in the body
    });
    if (response.data.status === "success") {
      set((state) => ({
        BlogList: state.BlogList.map((post) =>
          post._id === postId
            ? { ...post, likes: post.likes.filter((id) => id !== currentUserId) }
            : post
        ),
      }));
    }
    return response.data;
  } catch (error) {
    console.error("Error unliking post:", error.message);
    throw error;
  }
},









sharePost: async (postId, currentUserId) => {
  try {
    const response = await axios.post(
      `/api/sharePostController/${postId}`,
      {},
      {
        headers: {
          user_id: currentUserId, 
        },
      }
    );

    if (response.data.status === "success") {
      set((state) => ({
        BlogList: state.BlogList.map((post) =>
          post._id === postId
            ? { ...post, shares: [...post.shares, currentUserId] }
            : post
        ),
      }));
    }
    return response.data;
  } catch (error) {
    console.error("Error sharing post:", error.message);
    throw error;
  }
},






unsharePost: async (postId, currentUserId) => {
  try {
    const response = await axios.post(`/api/unsharePostController/${postId}`, {
      userId: currentUserId, // Send user ID in the body
    });
    if (response.data.status === "success") {
      set((state) => ({
        BlogList: state.BlogList.map((post) =>
          post._id === postId
            ? { ...post, shares: post.shares.filter((id) => id !== currentUserId) } // Update shares, not likes
            : post
        ),
      }));
    }
    return response.data;
  } catch (error) {
    console.error("Error unsharing post:", error.message);
    throw error;
  }
},




}));

export default CreatePost;
