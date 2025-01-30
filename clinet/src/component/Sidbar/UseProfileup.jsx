import React, { useState } from 'react';
import UserStore from '../../store/UserStore';

const UseProfileup = () => {
  

    return (
        <>
             

{visibleComments[item._id] && (
                    <div
                      className="mt-3"
                      style={{
                        backgroundColor: darkMode ? "#000435" : "#F8F9FA",
                        color: darkMode ? "#ffffff" : "#000000",
                        transition:
                          "background-color 0.3s ease, color 0.3s ease",
                      }}
                    >










<ul className="list-group mb-3">
  
   
      <li key={index} className="list-group-item d-flex align-items-start">
        <img
          src={comment.userID.profilePicture || "https://via.placeholder.com/50"}
          alt="Profile"
          className="rounded-circle me-3"
          style={{ width: "40px", height: "40px" }}
        />
        <div>
          <strong>{`${comment.userID.firstName} ${comment.userID.lastName}`}</strong>
          <p className="mb-1">{comment.commentText}</p>
          <small className="text-muted">{new Date(comment.createdAt).toLocaleDateString()}</small>
        </div>
      </li>


    <li className="list-group-item">No comments found</li>

</ul>

{/*                       


  // const handleSave = async (postId) => {
  //   // const postBody = { ...CommentBlogFormValue };
  //   try {
  //       let response = await CommentBlogRequest({...CommentBlogFormValue,postId});

  //       console.log(response)
  //       if (response.status === 'success') {
  //           await CommentDetailsRequest()
  //           toast.success("Blog Created Success");
  //           handleClose()

  //       } else {
  //           toast.error("Blog Created Failure");
  //       }
  //   } catch (err) {
  //       toast.error('Creating fail', err.message);
  //   }
  // };



 {
              headers: {
                  token: Cookies.get('token')
              }
          }






                      <ul className="list-group mb-3">
                        <li className="list-group-item d-flex align-items-start">
                          <img
                            src="https://placehold.co/800?text=No+Image"
                            alt="Profile"
                            className="rounded-circle me-3"
                            style={{ width: "40px", height: "40px" }}
                          />
                          <div>
                            <strong>hridoy islam</strong>
                            <p className="mb-1">nice pic</p>
                            <small className="text-muted">1/2/2020,1.30</small>
                          </div>
                        </li>

                      </ul> */}

                      <div className="d-flex">
                        <input
                          type="text"
                          className="form-control me-2"
                          placeholder="Write a comment..."
                          value={newComment[item._id] || ""}
                          onChange={e =>
                            setNewComment(item._id, e.target.value)
                          }
                        />
                        <button
                          className="btn btn-primary"
                          onClick={() => handleAddComment(item._id)}
                        >
                          Post
                        </button>
                      </div>
                    </div>
                  )}
        </>
    );
};

export default UseProfileup;










  {/* {CommentDetails && CommentDetails.length > 0 ? (
  <ul  className="list-group my-4">
    {CommentDetails.map((comment, index) => (
      <li key={index}>
          <img
                            src="https://placehold.co/800?text=No+Image"
                            alt="Profile"
                            className="rounded-circle me-3"
                            style={{ width: "40px", height: "40px" }}
                          />
        <strong>{comment.userID?.firstName} {comment.userID?.lastName}</strong>
        <p>{comment.text}</p>

        <small className="text-muted">1/2/2020,1.30</small>
      </li>
    ))}
  </ul>
) : (
  <p>No comments available.</p>
)} */}














   {/* <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Create New Blog</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
            
{CommentDetails && CommentDetails.length > 0 ? (
  <div className="container my-4">
    <h3 className="mb-4">Comments</h3>
    <ul className="list-group">
      {CommentDetails.map((comment, index) => (
        <li key={index} className="list-group-item d-flex align-items-start">
          <img
            src="https://placehold.co/800?text=No+Image"
            alt="Profile"
            className="rounded-circle me-3"
            style={{ width: "50px", height: "50px", objectFit: "cover" }}
          />
          <div className="flex-grow-1">
            <div className="d-flex justify-content-between align-items-center">
              <strong className="text-primary">
                {comment.userID?.firstName} {comment.userID?.lastName}
              </strong>
              <small className="text-muted">{new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}</small>
            </div>
            <p className="mb-1">{comment.text}</p>
          </div>
        </li>
      ))}
    </ul>
  </div>
) : (
  <div className="container my-4">
    <p className="text-muted text-center">No comments available.</p>
  </div>
)}
               
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Form.Label>Short Description</Form.Label>
              <Form.Control
                value={CommentBlogFormValue.text}
                onChange={event => {
                  CommentBlogFormOnChange("text", event.target.value);
                }}
                as="textarea"
                rows={1}
                placeholder="Enter Your Comment"
              />
              <Button
                variant="primary"
                onClick={event => handleSave(selectedPostId, event)}
              >
                Post
              </Button>
            </Modal.Footer>
          </Modal> */}














          
// <Modal show={show} onHide={handleClose} centered>
//   <Modal.Header closeButton>
//     <Modal.Title className="text-primary">Create New Blog</Modal.Title>
//   </Modal.Header>
//   <Modal.Body>
//     <Form>
//       {CommentDetails && CommentDetails.length > 0 ? (
//         <div className="container my-4">
//           <h4 className="mb-4">Comments</h4>
//           <ul className="list-group">
//             {CommentDetails.map((comment, index) => (
//               <li key={index} className="list-group-item d-flex align-items-start">
//                 <img
//                   src="https://placehold.co/800?text=No+Image"
//                   alt="Profile"
//                   className="rounded-circle me-3"
//                   style={{ width: "50px", height: "50px", objectFit: "cover" }}
//                 />
//                 <div className="flex-grow-1">
//                   <div className="d-flex justify-content-between align-items-center">
//                     <strong className="text-primary">
//                       {comment.userID?.firstName} {comment.userID?.lastName}
//                     </strong>
//                     <small className="text-muted">
//                       {new Date().toLocaleDateString()} {new Date().toLocaleTimeString()}
//                     </small>
//                   </div>
//                   <p className="mb-1">{comment.text}</p>
//                 </div>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ) : (
//         <div className="container my-4">
//           <p className="text-muted text-center">No comments available.</p>
//         </div>
//       )}
//     </Form>
//   </Modal.Body>
//   <Modal.Footer>
//     <div className="w-100">
//       <Form.Group className="mb-3">
//         <Form.Label className="fw-bold">Write a Comment</Form.Label>
//         <div className="d-flex">
//           {/* Input field for comment */}
//           <Form.Control
//             value={CommentBlogFormValue.text}
//             onChange={(event) => CommentBlogFormOnChange("text", event.target.value)}
//             as="input"
//             type="text"
//             placeholder="Enter your comment..."
//             className="border-primary flex-grow-1 me-2"
//           />
//           {/* Post button */}
//           <Button
//             variant="primary"
//             onClick={(event) => handleSave(selectedPostId, event)}
//           >
//             Post
//           </Button>
//         </div>
//       </Form.Group>
//       <div className="d-flex justify-content-end">
//         <Button variant="secondary" onClick={handleClose}>
//           Cancel
//         </Button>
//       </div>
//     </div>
//   </Modal.Footer>
// </Modal>












// const handleSave = async postId => {
//   try {
//     const requestData = { ...CommentBlogFormValue, postId };


//     let response = await CommentBlogRequest(requestData);

//     if (response?.status === "success") {
     
//       toast.success("Comment created successfully!");
    
//     } else {
//       toast.error(response?.message || "Failed to create comment");
//     }
//   } catch (err) {
//     console.error("Error in handleSave:", err);
//     toast.error(
//       "Creating comment failed: " + (err?.message || "Unknown error")
//     );
//   }
// };

