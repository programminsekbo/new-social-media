import { createCommentService, deleteCommentService, getCommentsByPostService, updateCommentService } from "../Services/CommentServes.js";





export const createComment = async (req, res) => {
    const result = await createCommentService(req);
    return res.status(result.status === "success" ? 201 : 400).json(result);
  };
  



  export const updateComment = async (req, res) => {
    const result = await updateCommentService(req);
    return res.status(result.status === "success" ? 200 : 400).json(result);
  };
  





export const getCommentsByPost = async (req, res) => {

  const { postId } = req.params;
  
  const result = await getCommentsByPostService(postId);
  if (result.status === 'fail') {
    return res.status(400).json(result);  // 400 Bad Request যদি postId না থাকে
  }
  
  return res.status(200).json(result); // 200 OK
};

  

  

  export const deleteComment = async (req, res) => {
    const { commentId } = req.params;
    const result = await deleteCommentService(commentId);
    return res.status(result.status === "success" ? 200 : 400).json(result);
  };
  

  