import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import './header.css';
import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';


import Button from 'react-bootstrap/Button';

function Header() {

    
    let [userLoginCheck, setUserLoginCheck] = useState(0)

  return (
    <>
      <Navbar bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="#home">MOUNTAIN</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="#home">Home</Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <Nav.Link href="#pricing">Pricing</Nav.Link>
            
            <ModalLogin></ModalLogin>
            <SignUpModal></SignUpModal>
           
            

          </Nav>
        </Container>
      </Navbar>
 
     
    

     
     
    </>
  );
}



function ModalLogin(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className='initial-button login-button' variant="light" onClick={handleShow}>
        Login
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>MOUNTAIN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="username">아이디 또는 이메일</label>
              <input type="text" className="form-control" id="username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">비밀번호</label>
              <input type="password" className="form-control" id="password" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="primary" onClick={handleClose}>
            로그인
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

function SignUpModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className='login-button' variant="success" onClick={handleShow}>
        Sign up
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>MOUNTAIN</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="form-group">
              <label htmlFor="newUsername">아이디</label>
              <input type="text" className="form-control" id="newUsername" />
            </div>
            <div className="form-group">
              <label htmlFor="newEmail">이메일</label>
              <input type="email" className="form-control" id="newEmail" />
            </div>
            <div className="form-group">
              <label htmlFor="newPassword">비밀번호</label>
              <input type="password" className="form-control" id="newPassword" />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            닫기
          </Button>
          <Button variant="success" onClick={handleClose}>
            가입하기
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
  
}



export default Header;