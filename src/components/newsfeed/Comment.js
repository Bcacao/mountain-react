import React from 'react';
import { BACKEND_URL } from '../../config';
import axios from 'axios';

const Comment = ({ setRefreshKey,comment, userId }) => {


  const handleDeleteComment = () => {
    axios.delete(`${BACKEND_URL}api/comment/${comment.comment_no}`,{ withCredentials: true })
    .then((result)=>{
      console.log('삭제 성공',result)
      setRefreshKey(prevKey => prevKey + 1);
    })
    .catch((error)=>{
      console.log('삭제 실패',error)
    })
  }
  return (
    <>
    
    <div className="comment">
      <img src={BACKEND_URL+'profile-images'+comment.member_image} alt="user" className="comment-user-image" />
      <div className="comment-info">
        <div className="comment-user-nick">{comment.member_nick}</div>
        <div className="comment-content">{comment.comment_content}</div>
        <div className="comment-time">{comment.comment_time.toLocaleString()}</div>
      </div>
      {comment.member_id === userId && <button onClick={handleDeleteComment}  className="comment-delete-button">삭제</button> }
      
    </div>
    </>
  );
};

export default Comment;