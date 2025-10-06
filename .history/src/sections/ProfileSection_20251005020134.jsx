import React, { useState, useEffect, useRef } from 'react';
import SimpleLanyard from '../components/SimpleLanyard/SimpleLanyard';
import Lanyard from '../components/Lanyard/Lanyard';

const ProfileSection = () => {
  const [isSimpleLanyard, setIsSimpleLanyard] = useState(true);
  const profileContainerRef = useRef(null);
  const [lanyardPosition, setLanyardPosition] = useState({ left: 0, top: 0, width: 340 });

  const toggleLanyard = () => {
    setIsSimpleLanyard(!isSimpleLanyard);
  };

  // Update lanyard position when switching to 3D
  useEffect(() => {
    if (!isSimpleLanyard && profileContainerRef.current) {
      const rect = profileContainerRef.current.getBoundingClientRect();
      setLanyardPosition({
        left: rect.left,
        top: rect.top,
        width: rect.width
      });
    }
  }, [isSimpleLanyard]);

  // Update position on scroll and resize
  useEffect(() => {
    if (isSimpleLanyard) return;

    const updatePosition = () => {
      if (profileContainerRef.current) {
        const rect = profileContainerRef.current.getBoundingClientRect();
        setLanyardPosition({
          left: rect.left,
          top: rect.top,
          width: rect.width
        });
      }
    };

    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);
    updatePosition(); // Initial update

    return () => {
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [isSimpleLanyard]);

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
        minHeight: '200vh', // Ensure container is tall enough for sticky to work
        overflow: isSimpleLanyard ? 'hidden' : 'visible', // Only allow overflow for 3D lanyard
        position: 'relative'
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
            width: '56px',
            height: '56px',
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
            width="28" 
            height="28" 
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

      {/* Spacer to push profile down initially - profile starts lower */}
      {isSimpleLanyard && <div style={{ height: '45vh' }}></div>}
      
      {/* Sticky container that sticks at center when scrolling */}
      <div style={{
        position: 'sticky',
        top: isSimpleLanyard ? '50%' : '0', // Stick at top for 3D lanyard, center for simple
        transform: isSimpleLanyard ? 'translateY(-50%)' : 'translateY(0)', // Center the simple card only
        width: '100%',
        maxWidth: isSimpleLanyard ? '340px' : '500px', // Moderate increase for 3D lanyard
        zIndex: 100,
        height: isSimpleLanyard ? 'auto' : '100vh', // Full height for 3D lanyard
        overflow: 'visible', // Allow lanyard to extend beyond container
        pointerEvents: 'none' // Allow interactions to pass through container
      }}>
        <div style={{ 
          pointerEvents: 'auto', // Re-enable pointer events for the actual component
          overflow: 'visible',
          width: '100%',
          height: '100%',
          position: 'relative'
        }}>
          {isSimpleLanyard ? <SimpleLanyard /> : <Lanyard />}
        </div>
      </div>
    </div>
  );
};

export default ProfileSection;