import React, { useState, useEffect } from 'react';
import Post from './Post';
import './Newsfeed.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { BACKEND_URL } from '../../config';
import axios from 'axios';


// Import other components and services

const Feed = ({isLoginCheck,userId}) => {
  
  const [refreshKey, setRefreshKey] = useState(0);
  const [posts, setPosts] = useState([]);


  useEffect(()=>{
    axios.get(BACKEND_URL + 'api/board',{ withCredentials: true })
    .then((result)=>{
      setPosts(result.data);
      console.log('목록 가져오기 성공', result.data);
    });
  },[refreshKey]);

  const [showModal, setShowModal] = useState(false);
  const [image, setImage] = useState(null);
  const [text, setText] = useState('');
  const [postImage, setPostImage] = useState(null);
 

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file));
      setPostImage(file);
    }
  };


  const handleAfterModal = () => {
    setImage(null);
    setText('');
  } 

  const handleCreateBoard = (e) =>{
      e.preventDefault();
      console.log('board 작성 시도:', postImage, text);

      const formData = new FormData();

      formData.append('board_content',text);
      if(!image){
        console.log('사진 필수');
        return;
      }else{
        formData.append('profileImage', postImage);
      }
     
      axios.post(BACKEND_URL + 'api/board', formData ,{ withCredentials: true })
      .then((result)=>{
        console.log(result);
        setShowModal(false);
        setRefreshKey(prevKey => prevKey + 1);
      }).catch((error)=>{
        console.error('board 작성 실패:', error);
        // 사용자에게 실패 메시지를 표시
        // 예: setError("회원가입에 실패했습니다. 다시 시도해주세요.");
      });
      
  }

  const [login, setLogin] = useState(false);

  useEffect(()=>{
    axios.get(BACKEND_URL+'api/member/check/',{ withCredentials: true })
    .then((response)=>{
      console.log("로그인 정보 있음",response);
      setLogin(true)
    })
      .catch((error)=>{
        console.error("로그인 정보 없음", error);
      setLogin(false);
    })
    }, [showModal]) 
    
    const handlePost = () =>{
      // if(login){
      //   setShowModal(true);
      // }else{
      //   alert('로그인 필요');
      // }
      axios.get(BACKEND_URL+'api/member/check/',{ withCredentials: true })
    .then((response)=>{
      console.log("로그인 정보 있음",response);
      setLogin(true)
      setShowModal(true);
    })
      .catch((error)=>{
        console.error("로그인 정보 없음", error);
      setLogin(false);
      alert('로그인 필요');
    })

    
    }

  return (
    <>

  {isLoginCheck ? 
    <Button variant="primary" onClick={handlePost} className="create-post-button" style={{ marginTop: '20px' }}>
        글작성
      </Button>
      : null}
    


      {showModal && (
        <Modal show={true} onHide={() => setShowModal(false)} centered size="lg" className="custom-modal">
          <Modal.Header closeButton>
            <Modal.Title>새 포스트 작성</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <div className="image-upload-container" style={{ marginBottom: '20px' }}>
                <label htmlFor="image-upload" style={{ width: '100%', cursor: 'pointer' }}>
                  <img
                    src={image || "https://via.placeholder.com/150"}
                    alt="Upload"
                    style={{ width: '70%', height: 'auto', display: 'block', margin: '0 auto' }}
                  />
                </label>
                <input
                  id="image-upload"
                  type="file"
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                />
              </div>
              <Form.Group className="mb-3" controlId="postContent">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  style={{ width: '100%' }}
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              취소
            </Button>
            <Button variant="primary" onClick={handleCreateBoard}>
              작성
            </Button>
          </Modal.Footer>
        </Modal>
      )}


    <div className="feed">
      {posts.map((post) => (
        <Post key={post.board_no} post={post} setRefreshKey={setRefreshKey } userId={userId}/>
        // Render Comments inside Post component or here based on your preference
      ))}
    </div>
    </>
  );
};

export default Feed;