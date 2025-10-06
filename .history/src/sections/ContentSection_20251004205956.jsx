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
      justifyContent: 'flex-end',
      paddingBottom: '10vh',
      overflow: 'hidden',
      boxSizing: 'border-box'
    }}>
      <HeroSection />
      <TechStackSection />
    </div>
  );
};

export default ContentSection;