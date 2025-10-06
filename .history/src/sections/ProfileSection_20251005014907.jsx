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
        paddingTop: isSimpleLanyard ? '80px' : '0', // No padding for 3D lanyard
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
            background: 'transparent',
            border: 'none',
            borderRadius: '12px',
            padding: '12px',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '48px',
            height: '48px'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.1)';
            e.target.style.background = 'rgba(147, 51, 234, 0.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1)';
            e.target.style.background = 'transparent';
          }}
        >
          {/* Swap/Reverse Icon SVG */}
          <svg 
            width="24" 
            height="24" 
            viewBox="0 0 24 24" 
            fill="none" 
            style={{
              color: '#9333ea', // Purple color
              transition: 'all 0.3s ease'
            }}
          >
            <path 
              d="M16 3L21 8L16 13M5 8H21M8 21L3 16L8 11M19 16H3" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>

      {/* Spacer to push profile down initially - profile starts lower */}
      {isSimpleLanyard && <div style={{ height: '45vh' }}></div>}
      
      {/* Sticky container that sticks at center when scrolling */}
      <div style={{
        position: 'sticky',
        top: isSimpleLanyard ? '50%' : '0', // Stick at top for 3D lanyard, center for simple
        transform: isSimpleLanyard ? 'translateY(-50%)' : 'translateY(0)', // Center the simple card only
        width: '100%',
        maxWidth: '340px',
        zIndex: 100,
        height: isSimpleLanyard ? 'auto' : '100vh' // Full height for 3D lanyard
      }}>
        {isSimpleLanyard ? <SimpleLanyard /> : <Lanyard />}
      </div>
    </div>
  );
};

export default ProfileSection;