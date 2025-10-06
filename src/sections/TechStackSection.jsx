import React from 'react';
import LogoLoop from '../animations/LogoLoop/LogoLoop';
import { techLogos } from '../data/techStack';
import CVFile from '../assets/CV_Praneeth_Chandra.pdf';

const TechStackSection = () => {
  const isMobile = window.innerWidth < 1200;
  const isTablet = window.innerWidth < 1000;
  
  const handleLetsTalk = () => {
    const contactSection = document.getElementById('contact');
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: 'smooth' });
    }
  };
  
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = CVFile;
    link.download = 'Praneeth_Chandra_CV.pdf';
    link.click();
  };

  return (
    <div style={{ 
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      overflow: 'hidden',
      width: '100%',
      maxWidth: '100vw',
      padding: isMobile ? '0 1rem' : '0',
      boxSizing: 'border-box'
    }}>
      {/* LogoLoop Section */}
      <div style={{ 
        height: isMobile ? '60px' : '80px',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        width: '100%',
        maxWidth: '100vw',
        position: 'relative'
      }}>
        <div style={{ 
          width: '100%', 
          height: isMobile ? '40px' : '60px',
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          maxWidth: '100%'
        }} data-logoloop>
          <LogoLoop
            logos={techLogos}
            speed={isMobile ? 30 : 40}
            direction="left"
            logoHeight={isMobile ? 32 : 48}
            gap={isMobile ? 40 : 60}
            pauseOnHover={!isMobile}
            scaleOnHover={!isMobile}
            fadeOut={true}
            fadeOutColor="#070311"
            ariaLabel="Technology stack"
            width="100%"
          />
        </div>
      </div>

      {/* Action Buttons */}
      <div style={{ 
        marginTop: '2rem',
        width: '100%',
        display: 'flex',
        gap: '1rem',
        justifyContent: isMobile ? 'center' : 'flex-start',
        flexWrap: 'wrap',
        padding: isMobile ? '0 1rem' : '0',
        boxSizing: 'border-box'
      }}>
        <button 
          onClick={handleLetsTalk}
          style={{
            background: 'linear-gradient(135deg, #8B5CF6, #A855F7)',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
            fontSize: isMobile ? '1rem' : '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 15px rgba(139, 92, 246, 0.3)',
            transform: 'translateY(0)',
            minWidth: 'fit-content',
            whiteSpace: 'nowrap'
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
        
        <button 
          onClick={handleDownloadCV}
          style={{
            background: 'transparent',
            color: '#A855F7',
            border: '2px solid #A855F7',
            borderRadius: '12px',
            padding: isMobile ? '0.8rem 1.5rem' : '1rem 2rem',
            fontSize: isMobile ? '1rem' : '1.1rem',
            fontWeight: '600',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            transform: 'translateY(0)',
            minWidth: 'fit-content',
            whiteSpace: 'nowrap'
          }}
          onMouseEnter={(e) => {
            e.target.style.background = '#A855F7';
            e.target.style.color = 'white';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 20px rgba(168, 85, 247, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.background = 'transparent';
            e.target.style.color = '#A855F7';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          Download CV
        </button>
      </div>
    </div>
  );
};

export default TechStackSection;