import React from 'react';
import LogoLoop from '../animations/LogoLoop/LogoLoop';
import { techLogos } from '../data/techStack.jsx';

const TechStackSection = () => {
  const handleLetsTalk = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
      width: '100%'
    }}>
      {/* LogoLoop Section */}
      <div style={{ 
        height: '80px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        width: '100%'
      }}>
        <div style={{ 
          width: '100%', 
          height: '60px',
          display: 'flex',
          alignItems: 'center'
        }} data-logoloop>
          <LogoLoop
            logos={techLogos}
            speed={40}
            direction="left"
            logoHeight={48}
            gap={60}
            pauseOnHover={true}
            scaleOnHover={true}
            fadeOut={true}
            fadeOutColor="#070311"
            ariaLabel="Technology stack"
            width="100%"
          />
        </div>
      </div>

      {/* Let's Talk Button */}
      <div style={{ 
        marginTop: '2rem',
        width: '100%',
        display: 'flex',
        justifyContent: 'flex-end'
      }}>
        <button 
          onClick={handleLetsTalk}
          style={{
            background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: '1rem 2rem',
            fontSize: '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
            transform: 'translateY(0)',
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 25px rgba(139, 92, 246, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = '0 4px 15px rgba(139, 92, 246, 0.3)';
          }}
        >
          Let's Talk
        </button>
      </div>
    </div>
  );
};

export default TechStackSection;