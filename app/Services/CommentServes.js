import { CommentModel } from "../model/CommentModel.js";
import { PostModel } from "../model/PostModel.js";
import mongoose from 'mongoose';
const ObjectID = mongoose.Types.ObjectId;

export const createCommentService = async (req) => {
  try {
    const { postId, text } = req.body;
    const userId = req.headers.user_id;

    if (!postId || !text) {
        return { status: "fail", message: "postId and text are required" };
    }

    const post = await PostModel.findById(postId);
    if (!post) {
        return { status: "fail", message: "Post not found" };
    }

    const newComment = new CommentModel({ userID: userId, postId, text });
    await newComment.save();

    post.comments.push(newComment._id);
    post.markModified('comments'); // নতুন যোগ করা
    await post.save();

    return { status: "success", message: "Comment added successfully", data: newComment };
  } catch (e) {
    console.error("Error Details:", e);
    return { status: "fail", message: "Something went wrong!", error: e.message };
  }
  };
  







  export const updateCommentService = async (req) => {
    try {
      const { commentId } = req.params;
      const { text } = req.body;
  
      if (!commentId || !text) {
        return { status: "fail", message: "commentId and text are required" };
      }
  
      const comment = await CommentModel.findById(commentId);
      if (!comment) {
        return { status: "fail", message: "Comment not found" };
      }
  
      // Update the comment text
      comment.text = text;
      await comment.save();
  
      return { status: "success", message: "Comment updated successfully", data: comment };
    } catch (e) {
      return { status: "fail", message: "Something went wrong!", error: e.message };
    }
  };
  











  export const getCommentsByPostService = async (postId) => {
    console.log("Fetching comments for postId:", postId);
    try {
   
      if (!postId || postId.length !== 24) {
       
        return { status: "fail", message: "Invalid postId format" };
      }
  
      
  
  
      const comments = await CommentModel.find({postId:postId})
      .populate("userID", "firstName lastName profilePicture")
      .exec();
  
      if (!comments || comments.length === 0) {
        return { status: "fail", message: "No comments found for this post" };
      }
  
      return { status: "success", data: comments };
    } catch (e) {
      return { status: "fail", message: "Something went wrong!", error: e.message };
    }

   

  };
  









  export const deleteCommentService = async (commentId) => {
    try {
      if (!commentId) {
        return { status: "fail", message: "commentId is required" };
      }
  
      const comment = await CommentModel.findById(commentId);
      if (!comment) {
        return { status: "fail", message: "Comment not found" };
      }
  
      await PostModel.findByIdAndUpdate(comment.post, { $pull: { comments: commentId } });
      await CommentModel.findByIdAndDelete(commentId);
  
      return { status: "success", message: "Comment deleted successfully" };
    } catch (e) {
      return { status: "fail", message: "Something went wrong!", error: e.message };
    }
  };
  