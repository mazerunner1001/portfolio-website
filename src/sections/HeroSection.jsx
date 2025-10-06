import React from 'react';
import TextType from '../animations/TextType/TextType';

const HeroSection = () => {
  const isMobile = window.innerWidth < 1200;
  const isTablet = window.innerWidth < 1000;
  
  return (
    <section id="home" className="hero-section" style={{
      position: 'relative',
      zIndex: 20,
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden',
      padding: isMobile ? '0 1rem' : '0'
    }}>
      <div style={{
        marginBottom: '3rem',
        width: '100%',
        maxWidth: '100%'
      }}>
        <TextType
          text={["Welcome to my Portfolio", "Building Intelligent Solutions"]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
          style={{
            fontSize: isMobile ? (isTablet ? '1.8rem' : '2.2rem') : '3rem',
            fontWeight: 'bold',
            marginBottom: '1rem',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            width: '100%',
            maxWidth: '100%',
            wordWrap: 'break-word',
            overflowWrap: 'break-word',
            hyphens: 'auto',
            lineHeight: isMobile ? '1.3' : '1.2',
            textAlign: isMobile ? 'center' : 'left'
          }}
        />
        <p style={{
          fontSize: isMobile ? '1rem' : '1.25rem',
          lineHeight: '1.8',
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '1.5rem',
          width: '100%',
          maxWidth: '100%',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          textAlign: isMobile ? 'center' : 'left'
        }}>
          Computer Science student at IIT (BHU) Varanasi with a passion for AI/ML,
          full-stack development, and building scalable systems. Experienced in developing
          innovative solutions from NLP models to IoT routing algorithms.
        </p>
        <p style={{
          fontSize: isMobile ? '0.95rem' : '1.1rem',
          color: 'rgba(255, 255, 255, 0.7)',
          width: '100%',
          maxWidth: '100%',
          wordWrap: 'break-word',
          overflowWrap: 'break-word',
          textAlign: isMobile ? 'center' : 'left'
        }}>
          Here are some of the technologies I work with:
        </p>
      </div>
    </section>
  );
};

export default HeroSection;