import React from 'react';
import HeroSection from './HeroSection';
import TechStackSection from './TechStackSection';

const ContentSection = () => {
  return (
    <div style={{
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      paddingTop: '15vh',
      overflow: 'hidden',
      boxSizing: 'border-box',
      padding: window.innerWidth < 1200 ? '5vh 1rem 0 1rem' : '15vh 0 0 0'
    }}>
      <HeroSection />
      <TechStackSection />
    </div>
  );
};

export default ContentSection;