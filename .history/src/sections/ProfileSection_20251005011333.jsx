import React, { useState } from 'react';
import SimpleLanyard from '../components/SimpleLanyard/SimpleLanyard';
import Lanyard from '../components/Lanyard/Lanyard';

const ProfileSection = () => {
  const [isSimpleLanyard, setIsSimpleLanyard] = useState(true);

  const toggleLanyard = () => {
    setIsSimpleLanyard(!isSimpleLanyard);
  };

  return (
    <div 
      className="profile-section" 
      style={{
        width: '32%',
        flexShrink: 0,
        paddingTop: '80px',
        paddingLeft: '0',
        paddingRight: '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '200vh' // Ensure container is tall enough for sticky to work
      }}
    >
      {/* Swap Button at the top left */}
      <div style={{
        position: 'fixed',
        top: '20px',
        left: '20px',
        zIndex: 1000
      }}>
        <button
          onClick={toggleLanyard}
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            borderRadius: '12px',
            color: '#fff',
            padding: '12px 20px',
            cursor: 'pointer',
            fontSize: '14px',
            fontWeight: '500',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.15)';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 12px 40px rgba(0, 0, 0, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.1)';
            e.target.style.transform = 'translateY(0px)';
            e.target.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.3)';
          }}
        >
          <span style={{ fontSize: '16px' }}>
            {isSimpleLanyard ? '🎮' : '📱'}
          </span>
          {isSimpleLanyard ? 'Switch to 3D' : 'Switch to Simple'}
        </button>
      </div>

      {/* Spacer to push profile down initially - profile starts lower */}
      <div style={{ height: '45vh' }}></div>
      
      {/* Sticky container that sticks at center when scrolling */}
      <div style={{
        position: 'sticky',
        top: '50%', // Stick at vertical center
        transform: 'translateY(-50%)', // Center the card itself
        width: '100%',
        maxWidth: '340px',
        zIndex: 100
      }}>
        {isSimpleLanyard ? <SimpleLanyard /> : <Lanyard />}
      </div>
    </div>
  );
};

export default ProfileSection;