import React from 'react';
import './footer.css';

const Footer = () => {
  return (
    <footer className=" text-white py-4 footer-position">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5>Contact Me</h5>
            <p>Email: boy5315@gmail.com</p>
            <p>Phone: 010-4113-6674</p>
          </div>
          <div className="col-md-6">
            <h5>Social Media</h5>
            <ul className="list-unstyled">
              <li><a href="#">Facebook</a></li>
              <li><a href="#">Twitter</a></li>
           
            </ul>
          </div>
        </div>
      
        
        <hr />
        <div className="row">
          <div className="col-12 text-center">
            <p>&copy; {new Date().getFullYear()} MOUNTAIN</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;