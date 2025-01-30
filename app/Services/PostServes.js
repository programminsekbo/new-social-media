//  Create a new blog
import mongoose from "mongoose";
import { PostModel } from "../model/PostModel.js";
const ObjectID = mongoose.Types.ObjectId;

// Get all blogs
export const getPostService = async () => {
  try {
    const data = await PostModel.find()
      .populate("userID", "firstName lastName profilePicture")
      .exec(); // firstName ও lastName যোগ করা হয়েছে// `populate` যোগ করা হয়েছে;
    return { status: "success", data: data };
  } catch (e) {
    return { status: "fail", data: e.message };
  }
};

export const createPostService = async req => {
  try {
    let user_id = req.headers.user_id;
    let reqBody = req.body;
    reqBody.userID = user_id;
    await PostModel.create(reqBody);
    return { status: "success", message: "Cart List Create Success" };
  } catch (e) {
    return { status: "fail", message: "Something Went Wrong !" };
  }
};

// Update a blog
export const updateBPostService = async req => {
  try {
    let user_id = new ObjectID(req.headers.user_id);
    let BlogID = new ObjectID(req.body.id);
    let reqBody = req.body;
    reqBody.userID = user_id;
    const data = await PostModel.updateOne(
      { userID: user_id, _id: BlogID },
      { $set: reqBody }
    );

    return { status: "Success", data: data };
  } catch (e) {
    return { status: "Fail", message: e.toString() };
  }
};

// Delete a blog
export const deletePostService = async req => {
  try {
    const userId = new ObjectID(req.headers["user_id"]);
    const blogId = req.body.id;

    if (!ObjectID.isValid(blogId)) {
      console.error("Invalid blog ID:", blogId);
      return { status: "fail", message: "Invalid blog ID" };
    }

    const BlogID = new ObjectID(blogId);

    const data = await PostModel.deleteOne({ _id: BlogID, userID: userId });

    if (data.deletedCount > 0) {
      return { status: "success", message: "Blog removed successfully" };
    } else {
      return {
        status: "fail",
        message: "This is not your post, sorry, it cannot be delete",
      };
    }
  } catch (error) {
    console.error("Error in deletePostService:", error);
    return { status: "fail", data: error.toString() };
  }
};

// Get a single blog by ID
export const getPostByIdService = async req => {
  try {
    const data = await PostModel.findById(req.params.id);

    return { status: "success", data: data };
  } catch (error) {
    return { status: "fail", data: error.toString() };
  }
};

//LIKE

export const likePostService = async req => {
  try {
    const { postId } = req.params;
    const currentUserId = req.headers.user_id;

    // Find post by ID
    const post = await PostModel.findById(postId);
    if (!post) {
      return { status: "fail", message: "Post not found" };
    }

    // Check if the user has already liked the post
    if (post.likes.includes(currentUserId)) {
      return { status: "fail", message: "You have already liked this post" };
    }

    // Add like to the post
    post.likes.push(currentUserId);
    await post.save();

    return { status: "success", message: "Post liked successfully" };
  } catch (e) {
    return {
      status: "fail",
      message: "Something went wrong",
      error: e.message,
    };
  }
};

export const unlikePostService = async req => {
  try {
    const { postId } = req.params; 
    const currentUserId = req.headers.user_id; 

    const post = await PostModel.findById(postId);
    if (!post) {
      return { status: "fail", message: "Post not found" }; 
    }

    
    if (!post.likes.includes(currentUserId)) {
      return { status: "fail", message: "You haven't liked this post yet" }; 
    }

  
    post.likes = post.likes.filter(id => id.toString() !== currentUserId);
    await post.save();


    return { status: "success", message: "Post unliked successfully" };
  } catch (e) {
   
    return {
      status: "fail",
      message: "Something went wrong",
      error: e.message,
    };
  }
};

export const sharePostService = async req => {
  try {
 
    const { postId } = req.params;
    const currentUserId = req.headers.user_id;

    if (!postId) {
      console.error("Post ID is missing.");
      return { status: "fail", message: "Post ID is missing in params" };
    }

    if (!currentUserId) {
      console.error("User ID is missing.");
      return { status: "fail", message: "User ID is missing in headers" };
    }

   

    const isValidPostId = mongoose.Types.ObjectId.isValid(postId);
    if (!isValidPostId) {
      console.error("Invalid Post ID");
      return { status: "fail", message: "Invalid Post ID" };
    }

    const post = await PostModel.findById(postId);
    if (!post) {
      console.error("Post not found.");
      return { status: "fail", message: "Post not found" };
    }

    if (post.shares.some((share) => share.toString() === currentUserId)) {
      console.error("Already shared by user.");
      return { status: "fail", message: "You have already shared this post" };
    }

    post.shares.push(currentUserId);
    await post.save();

    console.log("Post shared successfully.");
    return { status: "success", message: "Post shared successfully" };
  } catch (error) {
    console.error("Error in sharePostService:", error.message);
    return { status: "fail", message: "Something went wrong", error: error.message };
  }
};

// Unshare a Post Service
export const unsharePostService = async req => {
  try {
    const { postId } = req.params;
    const currentUserId = req.headers.user_id;

    const post = await PostModel.findById(postId);
    if (!post) {
      return { status: "fail", message: "Post not found" };
    }

    if (post.shares.some(share => share.toString() === currentUserId)) {
      return { status: "fail", message: "You have already shared this post" };
    }

    post.shares.push({ _id: currentUserId, sharedAt: new Date() });
    await post.save();

    return { status: "success", message: "Post shared successfully" };
  } catch (e) {
    console.error("Error in sharePostService:", e);  // Log the error
    return {
      status: "fail",
      message: "Something went wrong",
      error: e.message,
    };
  }
};
