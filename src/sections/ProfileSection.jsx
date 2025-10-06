import React, { useState } from 'react';
import SimpleLanyard from '../components/SimpleLanyard/SimpleLanyard';
import Lanyard from '../components/Lanyard/Lanyard';

const ProfileSection = ({ isMobile = false, isTablet = false, hideButtons = false }) => {
  const [isSimpleLanyard, setIsSimpleLanyard] = useState(true);

  const toggleLanyard = () => {
    setIsSimpleLanyard(!isSimpleLanyard);
  };

  return (
    <div 
      className="profile-section" 
      style={{
        width: isMobile ? '100%' : '32%',
        flexShrink: 0,
        paddingTop: isMobile ? '80px' : (isSimpleLanyard ? '80px' : '0'),
        paddingLeft: isMobile ? '20px' : '0',
        paddingRight: isMobile ? '20px' : '0',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: isMobile ? 'auto' : '200vh',
        overflow: 'visible',
        position: 'relative'
      }}
    >
      {/* Swap Button - hidden when screen < 800px */}
      {!hideButtons && (
        <div style={{
          position: 'fixed',
          top: '20px',
          left: '20px',
          zIndex: 1000
        }}>
        <button
          onClick={toggleLanyard}
          style={{
            background: 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(79, 70, 229, 0.2))',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(147, 51, 234, 0.4)',
            borderRadius: '50%',
            padding: '0',
            cursor: 'pointer',
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: isTablet ? '48px' : '56px',
            height: isTablet ? '48px' : '56px',
            boxShadow: '0 8px 25px rgba(147, 51, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'scale(1.15) rotate(180deg)';
            e.target.style.background = 'linear-gradient(135deg, rgba(147, 51, 234, 0.4), rgba(79, 70, 229, 0.4))';
            e.target.style.borderColor = 'rgba(147, 51, 234, 0.8)';
            e.target.style.boxShadow = '0 12px 35px rgba(147, 51, 234, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.2)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'scale(1) rotate(0deg)';
            e.target.style.background = 'linear-gradient(135deg, rgba(147, 51, 234, 0.2), rgba(79, 70, 229, 0.2))';
            e.target.style.borderColor = 'rgba(147, 51, 234, 0.4)';
            e.target.style.boxShadow = '0 8px 25px rgba(147, 51, 234, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
          }}
        >
          {/* Modern Swap Icon */}
          <svg 
            width={isTablet ? "24" : "28"} 
            height={isTablet ? "24" : "28"} 
            viewBox="0 0 24 24" 
            fill="none" 
            style={{
              transition: 'all 0.4s ease'
            }}
          >
            <path 
              d="M7 16L3 12L7 8M17 8L21 12L17 16M3 12H21" 
              stroke="url(#gradient)" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            />
            <defs>
              <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#e879f9" />
                <stop offset="50%" stopColor="#a855f7" />
                <stop offset="100%" stopColor="#8b5cf6" />
              </linearGradient>
            </defs>
          </svg>
        </button>
      </div>
      )}

      {/* Spacer to push profile down initially - only on desktop for simple lanyard */}
      {isSimpleLanyard && !isMobile && <div style={{ height: '45vh' }}></div>}
      
      {/* Profile container - static on mobile for proper flow */}
      <div style={{
        position: isMobile ? 'static' : 'sticky',
        top: isMobile ? 'auto' : (isSimpleLanyard ? '50%' : '0'),
        transform: isMobile ? 'none' : (isSimpleLanyard ? 'translateY(-50%)' : 'translateY(0)'),
        width: '100%',
        maxWidth: isMobile ? '100%' : '340px',
        zIndex: 100,
        height: 'auto',
        overflow: 'visible',
        pointerEvents: 'none',
        marginBottom: isMobile ? '30px' : '0'
      }}>
        <div style={{ 
          pointerEvents: 'auto', // Re-enable pointer events for the actual component
          overflow: 'visible',
          width: '100%',
          height: '100%'
        }}>
          {isSimpleLanyard ? <SimpleLanyard /> : <Lanyard />}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;