import React, { useState, useEffect } from 'react';
import { Container, Nav, Navbar, Modal, Button, Form } from 'react-bootstrap';
import './header.css';
import { BACKEND_URL } from '../../config';
import axios from 'axios'


function Header({setIsLoginCheck, setUserId}) {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showSignupModal, setShowSignupModal] = useState(false);
  const [logout, setLogout] = useState(false);
  const [login, setLogin] = useState(true);
  const [profileImageUrl, setProfileImageUrl] = useState('');

  useEffect(()=>{
    axios.get(BACKEND_URL+'api/member/check/',{ withCredentials: true })
    .then((response)=>{
      console.log("로그인 정보 있음",response);
      setLogin(false);
      setIsLoginCheck(true);
      setUserId(response.data.member_id);
      setProfileImageUrl(BACKEND_URL+'profile-images'+response.data.member_image)
    })
      .catch((error)=>{console.error("로그인 정보 없음", error)})
    },[logout, login])
 

    const handleLogout = (e) => {
      e.preventDefault();
      console.log('로그아웃 시도');
      axios.post(BACKEND_URL + 'api/member/logout/', {}, { withCredentials: true })
        .then(() => { 
          setLogout(false); 
          setLogin(true);
          setIsLoginCheck(false);
          setUserId('');
          })
        .catch((error) => { console.error('로그아웃 실패', error) });
    }

  // 로그인 모달
  const LoginModal = (props) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
      e.preventDefault();
      console.log('로그인 시도:', userId, password);
    
      // 수정된 부분: 객체 프로퍼티 값 할당 및 axios 요청 구조
      axios.post(BACKEND_URL + 'api/member/join/', { member_id: userId, member_pw: password },{ withCredentials: true })
        .then((result) => {
          console.log(result);
          setLogin(false);
          setIsLoginCheck(true)
          props.onHide(); // 성공 시 모달 닫기
          setLogout(true);
        })
        .catch((error) => {
          console.error('로그인 실패:', error);
          alert(error.response.data);
          // 여기서 실패 처리 로직을 추가할 수 있습니다.
          // 예를 들어, 사용자에게 실패 메시지를 보여주는 등의 작업이 가능합니다.
        });
    };

    return (
      <Modal {...props} centered>
        <Modal.Header closeButton>
          <Modal.Title>로그인</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3" controlId="loginUserId">
              <Form.Label>아이디</Form.Label>
              <Form.Control
                type="text"
                placeholder="아이디 입력"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="loginPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Button variant="primary" type="submit">로그인</Button>
          </Form>
        </Modal.Body>
        
      </Modal>
    );
  };

  // 회원가입 모달
  const SignupModal = (props) => {
    const [userId, setUserId] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [nickname, setNickname] = useState('');
    const [gender, setGender] = useState('male');
    const [profilePicture, setProfilePicture] = useState(null);
    const [previewUrl, setPreviewUrl] = useState('');

    useEffect(() => {
      if (!profilePicture) {
        setPreviewUrl('');
        return;
      }

      const objectUrl = URL.createObjectURL(profilePicture);
      setPreviewUrl(objectUrl);

      // Cleanup
      return () => URL.revokeObjectURL(objectUrl);
    }, [profilePicture]);

    const handleSignup = (e) => {
      e.preventDefault();
      console.log('회원가입 시도:', userId, password, name, nickname, gender, profilePicture);
    
      const formData = new FormData();
      formData.append('member_id', userId);
      formData.append('member_pw', password);
      formData.append('member_name', name);
      formData.append('member_nick', nickname);
      formData.append('member_gender', gender);
      if (profilePicture) {
        formData.append('profileImage', profilePicture);
      }
    
      axios.post(BACKEND_URL + 'api/member/', formData)
        .then((result) => {
          console.log(result);
          setLogin(false); // 가정: setLogin은 로그인 상태를 관리하는 함수
          setLogin(true);
          props.onHide(); // 성공 시 모달 닫기
        })
        .catch((error) => {
          console.error('회원가입 실패:', error);
          alert('사용중인 ID 입니다');
          // 사용자에게 실패 메시지를 표시
          // 예: setError("회원가입에 실패했습니다. 다시 시도해주세요.");
        });




  
    };

    const handleFileChange = (e) => {
      if (e.target.files[0]) {
        setProfilePicture(e.target.files[0]);
      }
    };

    return (
      <Modal {...props} centered >
        <Modal.Header closeButton>
          <Modal.Title>회원가입</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSignup}>
            <Form.Group className="mb-3" controlId="signupUserId">
              <Form.Label>아이디</Form.Label>
              <Form.Control
                type="text"
                placeholder="아이디 입력"
                value={userId}
                onChange={(e) => setUserId(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="signupPassword">
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호 입력"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="signupName">
              <Form.Label>이름</Form.Label>
              <Form.Control
                type="text"
                placeholder="이름 입력"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="signupNickname">
              <Form.Label>닉네임</Form.Label>
              <Form.Control
                type="text"
                placeholder="닉네임 입력"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="signupGender">
              <Form.Label>성별</Form.Label>
              <Form.Select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                required
              >
                <option value="male">남성</option>
                <option value="female">여성</option>
              </Form.Select>
            </Form.Group>
            <Form.Group controlId="signupProfilePicture" className="mb-3">
              <Form.Label>프로필 사진</Form.Label>
              <Form.Control
                type="file"
                onChange={handleFileChange}
              />
              {previewUrl && (
                <div style={{ marginTop: '10px' }}>
                  <img src={previewUrl} alt="Preview" style={{ width: '100px', height: '100px', objectFit: 'cover' }} />
                </div>
              )}
            </Form.Group>
            <Button variant="primary" type="submit">회원가입</Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  };

  return (
    <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">MOUNTAIN</Navbar.Brand>
          <Nav className="me-auto">
          {
            login ? 
            <>
              <Nav.Link onClick={() => setShowLoginModal(true)}>로그인</Nav.Link>
            <Nav.Link onClick={() => setShowSignupModal(true)}>회원가입</Nav.Link>
          </> : 
          <>
          <CircularImage></CircularImage>
          <Nav.Link onClick={(e) => handleLogout(e)}>로그아웃</Nav.Link>
          
          </>}
            
          </Nav>
        </Container>
      </Navbar>
      
      <LoginModal show={showLoginModal} onHide={() => setShowLoginModal(false)} />
      <SignupModal show={showSignupModal} onHide={() => setShowSignupModal(false)} />
    </>
  );


  function CircularImage({ imageUrl }) {
    return (
      <img src={profileImageUrl} alt="Profile" className="profile-image" />
    );
  }
}

export default Header;
