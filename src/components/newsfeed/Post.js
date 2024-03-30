import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import axios from 'axios';
import { BACKEND_URL } from '../../config';


const Post = ({ post,setRefreshKey,userId }) => {
  const [testImage, settestImage] = useState('');
  // board 수정 상태
  const [isEditing, setIsEditing] = useState(false);
  // 수정할 정보 
  const [editedPost, setEditedPost] = useState({
    member_nick: post.member_nick,
    board_content: post.board_content,
    image: post.board_image, 
  });

  
  const myStyle = {
    color: 'white',
    backgroundColor: 'blue',
    padding: '10px',
    fontFamily: 'Arial'
  };


 // 수정 버튼 누르면 수정랜더링
 const handleEdit = () => {
  axios.post(BACKEND_URL+'api/board/checkmyboard/',{board_no: post.board_no},{ withCredentials: true })
  .then((result)=>{
    if(result.data){
      
      setIsEditing(true);

    }else{
      alert("내 게시물 아님")
    }
  }).catch((error)=>{
    console.log(error);
    alert("로그인 필요");
  })
   
};


  // 취소 버튼 
  const handleExit = () => {

    

    setIsEditing(false);
  };

  // 삭제 버튼
  const handleDelete = () =>{

     axios.post(BACKEND_URL+'api/board/checkmyboard/',{board_no: post.board_no},{ withCredentials: true })
  .then((result)=>{
    if(result.data){
      
      axios.delete(`${BACKEND_URL}api/board/${post.board_no}`, { withCredentials: true })
      .then((result)=>{
        console.log(result);
        setRefreshKey(prevKey => prevKey + 1);
        setIsEditing(true);
      })
      .catch((error)=>{
        console.log(error)
      })
      

    }else{
      alert("내 게시물 아님")
    }
  }).catch((error)=>{
    console.log(error);
    alert("로그인 필요");
  })
  }

  const handleSave = () => {
    
    // 여기에서 수정된 게시물 데이터를 서버에 저장하는 로직을 추가합니다.

    const formData = new FormData();
    formData.append('board_content',editedPost.board_content);
    formData.append('board_image',testImage);
    formData.append('board_no',post.board_no);

    axios.post(BACKEND_URL+'api/board/update/',formData,{ withCredentials: true })
    .then((result)=>{
      console.log("수정 성공", result);
      setEditedPost({ ...editedPost, image: post.board_image, board_content: post.board_content});
      setRefreshKey(prevKey => prevKey + 1);
    })
    .catch((error)=>{
      console.error("수정 실패", error);
      setEditedPost({ ...editedPost, image: post.board_image, board_content: post.board_content });
    })

    setIsEditing(false);
  };


  // 파일업로드 이미지 보여주는 부분
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setEditedPost({ ...editedPost, image: reader.result });
      settestImage(file);

    };
    reader.readAsDataURL(file);
  };


   // 댓글 입력 상태 관리
   const [newComment, setNewComment] = useState('');
   const [boardNo, setboardNo] = useState('');

   // 댓글 제출 핸들러 (실제 데이터 처리 로직은 여기에 구현합니다)
   const handleSubmit = (e) => {
    e.preventDefault();

    axios.get(BACKEND_URL+'api/member/check/',{ withCredentials: true })
    .then((response)=>{
      console.log("로그인 정보 있음 댓글 작성 가능",response);
      
      
      axios.post(BACKEND_URL + 'api/comment/', { board_no: boardNo, comment_content: newComment },{ withCredentials: true })
      .then((result)=>{
        console.log(result);
        setRefreshKey(prevKey => prevKey + 1);
      })
      .catch((error)=>{
        console.error('작성 실패:', error);

      })

      setNewComment('');
    })
      .catch((error)=>{
        console.error("로그인 정보 없음 댓글 작성 안됨", error);
        alert('로그인이 필요합니다');
      
      ;
    })
    
     

   
   };

 

  return (
    <div className="post">
      <div className="post-header">
        <img src={BACKEND_URL+'profile-images'+post.member_image} alt="Post" className="post-user-image" />
          <span className='member-nick'>{editedPost.member_nick}</span>
       

        <div className="edit-buttons">

          {userId === post.member_id &&
         <>
         {isEditing ? (
            <>
            <button onClick={handleSave} className='button-style'>저장</button>
            <button onClick={handleExit} className='button-style'>취소</button>
            </>
          ) : (
            <>
            <button onClick={handleEdit} className='button-style'>수정</button>
            <button onClick={handleDelete }className='button-style'>삭제</button>
            </>
          )}
          </>
}



        </div>
      </div>

      {isEditing ? (
        <div onClick={() => document.getElementById('imageInput').click()} style={{ cursor: 'pointer' }}>
          <p>(사진을 눌러 사진 수정 가능)</p>
          <img src={editedPost.image.startsWith('data:image') ? editedPost.image : BACKEND_URL+'board-images'+editedPost.image} alt="Post" className="post-image" />
          <input type="file" id="imageInput" style={{ display: 'none' }} onChange={handleImageChange} />
        </div>
      ) : (
        <img src={BACKEND_URL+'board-images'+post.board_image} alt="Post" className="post-image" />
      )}

      <div className="post-body">
        <div className="post-content">

          {isEditing ? (
            <textarea
              value={editedPost.board_content}
              onChange={(e) => setEditedPost({ ...editedPost, board_content: e.target.value })}
            />
          ) : (
            post.board_content
          )}
          
        </div>
        <div className="post-time">{post.board_time.toLocaleString()}</div>
       
        <form onSubmit={handleSubmit} className="comment-form">
        <input
          type="text"
          value={newComment}
          onChange={(e) => {
            setNewComment(e.target.value);
            setboardNo(post.board_no);
          }}

          className="comment-input"
          placeholder="댓글 작성..."
        />
        <button type="submit" className="comment-submit-button">확인</button>
      </form>

      <div className="post-comments">
  {post.comments
    .filter(comment => comment.comment_no > 0) // comment_no가 0보다 큰 댓글만 필터링
    .map(comment => (
      <Comment key={comment.comment_no} setRefreshKey={setRefreshKey} comment={comment} userId={userId} />
    ))}
</div>
      </div>
    </div>
  );
};

export default Post;
