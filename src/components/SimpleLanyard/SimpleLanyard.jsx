import React from 'react';
import './SimpleLanyard.css';
import profileImage from '../../assets/Profile.jpg';
import profileBackground from '../../assets/ProfileBackground.png';
import { FaGithub, FaLinkedin, FaInstagram, FaEnvelope } from 'react-icons/fa';

const SimpleLanyard = () => {
  return (
    <div className="profile-card-container">
      <div className="modern-profile-card" style={{
        backgroundImage: `url(${profileBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(120, 92, 246, 0.3)'
      }}>
        <div className="card-shine"></div>
        
        <div className="profile-image-container">
          <img src={profileImage} alt="Profile" />
        </div>
        
        <div className="profile-info">
          <h2 className="profile-name">Swarna Praneeth Chandra</h2>
          <p className="profile-title">Computer Science Student & Developer</p>
          <p className="profile-location">IIT (BHU) Varanasi</p>
        </div>
        
        <div className="social-icons">
          <a href="https://github.com/mazerunner1001" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaGithub />
          </a>
          <a href="www.linkedin.com/in/praneeth-chandra-957240251" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaLinkedin />
          </a>
          <a href="https://www.instagram.com/praneethchandra123" target="_blank" rel="noopener noreferrer" className="social-icon">
            <FaInstagram />
          </a>
          <a href="mailto:spraneethchandra123@gmail.com" className="social-icon">
            <FaEnvelope />
          </a>
        </div>
      </div>
    </div>
  );
};

export default SimpleLanyard;