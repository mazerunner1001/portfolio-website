import React from 'react';
import './SimpleLanyard.css';
import profileImage from '../../assets/Profile.jpg';
import profileBackground from '../../assets/ProfileBackground.png';
import { FaDribbble, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';

const SimpleLanyard = () => {
  return (
    <div className="profile-card-container">
      <div className="modern-profile-card" style={{
        backgroundImage: `url(${profileBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundColor: 'rgba(139, 92, 246, 0.4)'
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
          <div className="social-icon">
            <FaDribbble />
          </div>
          <div className="social-icon">
            <FaTwitter />
          </div>
          <div className="social-icon">
            <FaInstagram />
          </div>
          <div className="social-icon">
            <FaEnvelope />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SimpleLanyard;