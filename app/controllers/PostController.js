import { createPostService, deletePostService, getPostByIdService, getPostService, likePostService, sharePostService, unlikePostService, unsharePostService, updateBPostService } from "../Services/PostServes.js";

// Get all blogs
export const getPost = async (req, res) => {
    const result = await getPostService();
    return res.json(result);
  };
  
  // Create a new blog
  export const createPost = async (req, res) => {
   // const blogData = req.body;
    const result = await createPostService(req);
    return res.status(200).json(result)
  };
  
  // Update an existing blog
  export const updatePost = async (req, res) => {
    const result = await updateBPostService(req);
    return res.status(200).json(result);
  };
  
  // Delete a blog
  export const deletePost = async (req, res) => {
    const result = await deletePostService(req);
    return res.status(200).json(result);
  };



  // Get a single blog by ID
export const getPostById = async (req, res) => {
 
    const result = await getPostByIdService(req);
    return res.status(200).json(result);
  };






  // Like a post
export const likePostController = async (req, res) => {
  const result = await likePostService(req);
  return res.status(result.status === 'success' ? 200 : 400).json(result);
};

// Unlike a post
export const unlikePostController = async (req, res) => {
  const result = await unlikePostService(req);
  return res.status(result.status === 'success' ? 200 : 400).json(result);
};


export const sharePostController = async (req, res) => {
  const result = await sharePostService(req);

  // Check the exact match for "success"
  return res.status(result.status === "success" ? 200 : 400).json(result);
};

// Unshare a Post
export const unsharePostController = async (req, res) => {
  const result = await unsharePostService(req);
  
  return res.status(result.status === "success" ? 200 : 400).json(result);
};