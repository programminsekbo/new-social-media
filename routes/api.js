import express from "express";
const router = express.Router();

import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";
import * as UsersController from "../app/controllers/UsersController.js";
import * as PostController from "../app/controllers/PostController.js";
import * as commentControlles from "../app/controllers/commentControlles.js";

// Users
router.post("/CreateUserProfile", UsersController.CreateUserProfile);
router.post("/Login", UsersController.Login);
router.post("/VerifyLogin", UsersController.VerifyLogin);
router.get("/UserLogout", AuthMiddleware, UsersController.UserLogout);
router.post(
  "/UpdateUserProfile",
  AuthMiddleware,
  UsersController.UpdateUserProfile
);

router.get("/getUser", AuthMiddleware, UsersController.getUser);
router.get("/getProfile", AuthMiddleware, UsersController.getProfile);

// 1. **Follow User**
router.post(
  "/followUserController/:followUserId",
  AuthMiddleware,
  UsersController.followUserController
);
router.post(
  "/unfollowUserController/:unfollowUserId",
  AuthMiddleware,
  UsersController.unfollowUserController
);

// createpost
router.get("/getPost", AuthMiddleware, PostController.getPost);
router.post("/createPost", AuthMiddleware, PostController.createPost);
router.post("/updatePost", AuthMiddleware, PostController.updatePost);
router.post("/deletePost", AuthMiddleware, PostController.deletePost);
router.post("/getPostById", AuthMiddleware, PostController.getPostById);

// 1. **Like Post**
router.post(
  "/likePostController/:postId",
  AuthMiddleware,
  PostController.likePostController
);

// 2. **Unlike Post**
router.post(
  "/unlikePostController/:postId",
  AuthMiddleware,
  PostController.unlikePostController
);

// user share

router.post(
  "/sharePostController/:postId",
  AuthMiddleware,
  PostController.sharePostController
);

router.post(
  "/unsharePostController/:postId",
  AuthMiddleware,
  PostController.unsharePostController
);

//comments

router.post("/createComment", AuthMiddleware, commentControlles.createComment);
router.get(
  "/getCommentsByPost/:postId",
  AuthMiddleware,
  commentControlles.getCommentsByPost
);
router.delete(
  "/deleteComment/:commentId",
  AuthMiddleware,
  commentControlles.deleteComment
);
router.put(
  "/updateComment/:commentId",
  AuthMiddleware,
  commentControlles.updateComment
);

export default router;
