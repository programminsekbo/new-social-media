import React, { useEffect, useState } from "react";
import MentPost from "../post/MentPost";
import CreatePost from "../../store/CreatePost";
import toast from "react-hot-toast";
import { Dropdown } from "bootstrap";
import { FiMoreVertical } from "react-icons/fi";
import { Modal, Button, Form } from "react-bootstrap";
import Loding from "./Loding";
import CommentStore from "../../store/CommentStore";
import { useTheme } from "../../ThemeProvider/ThemeContext";

import { FaThumbsUp, FaComment, FaShareAlt } from "react-icons/fa";

const MainContent = () => {
  const {
    sharePost,
    unsharePost,
    BlogList,
    LikeListRequest,
    UnLikeListRequest,
    DeleteBlog,
    BlogListRequest,
    CreateBlogFormValue,
    CreateBlogFormOnChange,
    UpdateBlogRequest,
  } = CreatePost();

  const {
    CommentDetails,
    CommentBlogFormValue,
    CommentBlogFormOnChange,
    CommentBlogRequest,
    CommentDetailsRequest,
  } = CommentStore();

  const [updateShow, setUpdateShow] = useState(false);
  const [selectedBlog, setSelectedBlog] = useState(null);
  const { darkMode, toggleTheme } = useTheme();

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [selectedPostId, setSelectedPostId] = useState(null); // Declare selectedPostId state

  const handleShow = id => {
    setShow(true);
    setSelectedPostId(id); // Store the current post ID in state
  };

  const handleSave = async postId => {
    const requestData = { ...CommentBlogFormValue, postId };

    try {
      await CommentBlogRequest(requestData);
      await CommentDetailsRequest(selectedPostId);
      CommentBlogFormOnChange("text", "");
      toast.success("Blog Updated Success");
      await BlogListRequest();
    } catch (err) {
      toast.error("Creating comment failed: ", err.message);
    }
  };

  useEffect(() => {
    if (selectedPostId) {
      (async () => {
        await CommentDetailsRequest(selectedPostId);
      })();
    }
  }, [selectedPostId]);

  const UpdateModalClose = () => setUpdateShow(false);
  const UpdateModalShow = blog => {
    setSelectedBlog(blog);
    CreateBlogFormOnChange("caption", blog.caption);
    CreateBlogFormOnChange("image", blog.img);
    setUpdateShow(true);
  };

  //update modal

  const handleUpdate = async () => {
    const postBody = { ...CreateBlogFormValue, id: selectedBlog._id };
    try {
      await UpdateBlogRequest(postBody);
      await BlogListRequest();
      toast.success("Blog Updated Success");
      UpdateModalClose();
      CreateBlogFormOnChange("caption", "");
      CreateBlogFormOnChange("image", "");
    } catch (err) {
      const errorMessage = err.message || "An unexpected error occurred";
      toast.error(`Updating failed: ${errorMessage}`);
    }
  };

  const currentUserId = sessionStorage.getItem("userId") || "defaultUserId";

  const handleLike = async (postId, item, currentUserId) => {
    try {
      const isLiked = item.likes.includes(currentUserId);

      if (isLiked) {
        await UnLikeListRequest(postId, currentUserId); // Unliking if already liked
        toast.success("Unliked successfully!");
      } else {
        await LikeListRequest(postId, currentUserId); // Liking if not liked
        toast.success("Liked successfully!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error handling like:", error.message);
    }
  };

  const handleUnlike = async (postId, currentUserId) => {
    try {
      await UnLikeListRequest(postId, currentUserId); // Unliking the post
      toast.success("Unliked successfully!");
    } catch (error) {
      toast.error("Something went wrong!");
      console.error(error);
    }
  };

  //delete post

  const handleDelete = async blogId => {
    try {
      if (!blogId) {
        throw new Error("Blog ID পাওয়া যায়নি।");
      }
      await DeleteBlog(blogId);
      await BlogListRequest();
      toast.success("পোস্ট সফলভাবে মুছে ফেলা হয়েছে।");
    } catch (error) {
      console.error("Delete failed:", error);
      toast.error("পোস্ট ডিলিট করতে ব্যর্থ হয়েছে।");
    }
  };

  const handleShare = async (postId, item, currentUserId) => {
    try {
      const isShared = item.shares.includes(currentUserId);

      if (isShared) {
        await unsharePost(postId, currentUserId); // Unshare if already shared
        toast.success("Unshared successfully!");
      } else {
        await sharePost(postId, currentUserId); // Share if not shared
        toast.success("Shared successfully!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error handling share:", error.message);
    }
  };

  const handleUnShare = async (postId, currentUserId) => {
    try {
      const response = await unsharePost(postId, currentUserId); // Call unsharePost API
      if (response.status === "success") {
        toast.success("Unshared successfully!");
      } else {
        toast.error(response.message || "Failed to unshare the post!");
      }
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("Error in handleUnShare:", error.message);
    }
  };

  return (
    <>
      <main
        className="col-md-6 col-12 p-3 "
        style={{
          backgroundColor: darkMode ? "#06141d" : "#F8F9FA", // Dynamically change background color
          color: darkMode ? "#ffffff" : "#000000", // Dynamically change text color
          transition: "background-color 0.3s ease, color 0.3s ease", // Smooth transition
        }}
      >
        <div
          style={{
            paddingLeft: "50px",
            paddingRight: "50px",
          }}
        >
          <MentPost />

          {BlogList && BlogList.length > 0 ? (
            BlogList.map(item => (
              <div
                className="post card mb-3"
                key={item._id}
                style={{
                  backgroundColor: darkMode ? "#1a2730" : "#FFFFFF", // Dynamically change background color
                  color: darkMode ? "#ffffff" : "#000000", // Dynamically change text color
                  transition: "background-color 0.3s ease, color 0.3s ease", // Smooth transition
                }}
              >
                <div className="card-body">
                  <div className="d-flex align-items-center mb-3">
                    <img
                      src={
                        item.userID?.profilePicture ||
                        "https://placehold.co/800?text=No+Image"
                      }
                      alt="Profile"
                      className="rounded-circle me-3"
                      style={{ width: "40px", height: "40px" }}
                    />
                    <div>
                      <h6>
                        {item.userID?.firstName && item.userID?.lastName
                          ? `${item.userID.firstName} ${item.userID.lastName}`
                          : "Anonymous User"}
                      </h6>
                      <small>{new Date(item.createdAt).toLocaleString()}</small>
                    </div>

                    {/* EdditPost Component */}

                    <div className="btn-group dropstart ms-auto ">
                      <button
                        type="button"
                        // className=" dropdown-toggle" //btn btn-white
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                        style={{
                          backgroundColor: darkMode ? "#000435" : "#FFFFFF", // Dynamically change background color
                          color: darkMode ? "#ffffff" : "#000000", // Dynamically change text color
                          transition:
                            "background-color 0.3s ease, color 0.3s ease", // Smooth transition
                          border: "none", // Remove border from button
                        }}
                      >
                        <FiMoreVertical />
                      </button>
                      <ul className="dropdown-menu dropdown-menu-end">
                        <li>
                          <button
                            onClick={async () => {
                              await handleDelete(item["_id"]);
                            }}
                            className="dropdown-item"
                          >
                            {" "}
                            Delete your post
                          </button>
                        </li>
                        <li>
                          <button
                            onClick={() => UpdateModalShow(item)}
                            className="dropdown-item"
                          >
                            Eddit your post
                          </button>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <p>{item.caption}</p>
                  {item.image && item.image.length > 0 && (
                    <img
                      src={item.image[0]}
                      alt="Post"
                      className="img-fluid rounded card-img-top"
                    />
                  )}
                  <div className="d-flex justify-content-between mt-3">
                    {item.likes.includes(currentUserId) ? (
                      <span
                        onClick={() => handleUnlike(item._id, item)} // Call handleUnlike when clicked
                        style={{ cursor: "pointer", color: "red" }}
                      >
                        <FaThumbsUp /> ({item.likes.length})
                      </span>
                    ) : (
                      <span
                        onClick={() => handleLike(item._id, item)} // Call handleLike when clicked
                        style={{ cursor: "pointer" }}
                      >
                        <FaThumbsUp /> ({item.likes.length})
                      </span>
                    )}

                    <span
                      onClick={() => handleShow(item._id)}
                      style={{ cursor: "pointer" }}
                    >
                      {" "}
                      <FaComment /> ({item.comments.length})
                    </span>

                    {item.shares.includes(currentUserId) ? (
                      <span
                        onClick={() => handleUnShare(item._id, item)}
                        style={{ cursor: "pointer" }}
                      >
                        <FaShareAlt /> ({item.shares.length}){" "}
                        {/* Updated count */}
                      </span>
                    ) : (
                      <span
                        onClick={() => handleShare(item._id, item)}
                        style={{ cursor: "pointer" }}
                      >
                        <FaShareAlt /> ({item.shares.length}){" "}
                        {/* Updated count */}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div>
              <Loding />
            </div>
          )}

          <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
              <Modal.Title className="text-primary">
                Create New Blog
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                {CommentDetails && CommentDetails.length > 0 ? (
                  <div className="container my-4">
                    <h4 className="mb-4">Comments</h4>
                    <ul className="list-group">
                      {CommentDetails.map((comment, index) => (
                        <li
                          key={index}
                          className="list-group-item d-flex align-items-start"
                        >
                          <img
                            src="https://placehold.co/800?text=No+Image"
                            alt="Profile"
                            className="rounded-circle me-3"
                            style={{
                              width: "50px",
                              height: "50px",
                              objectFit: "cover",
                            }}
                          />
                          <div className="flex-grow-1">
                            <div className="d-flex justify-content-between align-items-center">
                              <strong className="text-primary">
                                {comment.userID?.firstName}{" "}
                                {comment.userID?.lastName}
                              </strong>
                              <small className="text-muted">
                                {new Date().toLocaleDateString()}{" "}
                                {new Date().toLocaleTimeString()}
                              </small>
                            </div>
                            <p className="mb-1">{comment.text}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <div className="container my-4">
                    <p className="text-muted text-center">
                      No comments available.
                    </p>
                  </div>
                )}
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <div className="w-100">
                <Form.Group className="mb-3">
                  <Form.Label className="fw-bold">Write a Comment</Form.Label>
                  <div className="d-flex">
                    {/* Input field for comment */}
                    <Form.Control
                      value={CommentBlogFormValue.text}
                      onChange={event =>
                        CommentBlogFormOnChange("text", event.target.value)
                      }
                      as="input"
                      type="text"
                      placeholder="Enter your comment..."
                      className="border-primary flex-grow-1 me-2"
                    />
                    {/* Post button */}
                    <Button
                      variant="primary"
                      onClick={event => handleSave(selectedPostId, event)}
                    >
                      Post
                    </Button>
                  </div>
                </Form.Group>
              </div>
            </Modal.Footer>
          </Modal>

          {/* Update Blog Modal */}
          <Modal show={updateShow} onHide={UpdateModalClose}>
            <Modal.Header closeButton>
              <Modal.Title className="fw-bold text-primary">
                Eddit Your Post
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formFullContent" className="mb-3">
                  <Form.Label>Full Description</Form.Label>
                  <Form.Control
                    value={CreateBlogFormValue.caption}
                    onChange={event => {
                      CreateBlogFormOnChange("caption", event.target.value);
                    }}
                    as="textarea"
                    rows={3}
                    placeholder="Enter full description"
                  />
                </Form.Group>
                <Form.Group controlId="formImageUpload" className="mb-3">
                  <Form.Label>Upload Image</Form.Label>
                  <Form.Control
                    value={CreateBlogFormValue.image}
                    onChange={event => {
                      CreateBlogFormOnChange("image", event.target.value);
                    }}
                    type="text"
                    placeholder="Enter img URL"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={UpdateModalClose}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
                Update Blog
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </main>
    </>
  );
};

export default MainContent;
