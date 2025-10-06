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
      {isSimpleLanyard && <div style={{ height: '45vh' }}></div>}
      
      {/* Sticky container that sticks at center when scrolling */}
      <div style={{
        position: isSimpleLanyard ? 'sticky' : 'fixed', // Fixed positioning for 3D lanyard
        top: isSimpleLanyard ? '50%' : '0', // Start from very top for 3D lanyard
        left: isSimpleLanyard ? 'auto' : '0', // Position from left edge for 3D lanyard
        transform: isSimpleLanyard ? 'translateY(-50%)' : 'translateY(0)', // Center the simple card only
        width: isSimpleLanyard ? '100%' : '100vw', // Full viewport width for 3D lanyard to prevent clipping
        maxWidth: isSimpleLanyard ? '340px' : 'none', // Remove max width constraint for 3D
        height: isSimpleLanyard ? 'auto' : '100vh', // Full height for 3D lanyard
        zIndex: 100,
        pointerEvents: isSimpleLanyard ? 'auto' : 'none', // Allow interactions to pass through for 3D
        display: 'flex',
        justifyContent: isSimpleLanyard ? 'center' : 'flex-start', // Center simple, left align 3D
        paddingLeft: isSimpleLanyard ? '0' : '10%' // Add some left padding for 3D lanyard positioning
      }}>
        {isSimpleLanyard ? <SimpleLanyard /> : 
          <div style={{ pointerEvents: 'auto', width: '400px', height: '100vh' }}>
            <Lanyard />
          </div>
        }
      </div>
    </div>
  );
};

export default ProfileSection;