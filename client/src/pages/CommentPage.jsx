import React, { useEffect } from 'react';
import Layout from './../component/NavBar/Layout';
import { useParams } from 'react-router-dom';

const CommentPage = () => {
 const {CommentRequest,handleAddComment}=CommentStore()

 const {postId}=useParams();

    useEffect(() => {
        (async()=>{

  await CommentRequest(postId)
  await handleAddComment()

        })()
      }, []); 
    return (
        <Layout>
            
        </Layout>
    );
};

export default CommentPage;