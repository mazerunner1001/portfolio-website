import React from 'react';
import TextType from '../animations/TextType/TextType';

const HeroSection = () => {
  return (
    <section id="home" className="hero-section" style={{
      position: 'relative',
      zIndex: 20,
      width: '100%',
      maxWidth: '100%',
      overflow: 'hidden'
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
        />
        <p style={{
          fontSize: '1.25rem',
          lineHeight: '1.8',
          color: 'rgba(255, 255, 255, 0.8)',
          marginBottom: '1.5rem',
          width: '100%',
          maxWidth: '100%',
          wordWrap: 'break-word'
        }}>
          Computer Science student at IIT (BHU) Varanasi with a passion for AI/ML,
          full-stack development, and building scalable systems. Experienced in developing
          innovative solutions from NLP models to IoT routing algorithms.
        </p>
        <p style={{
          fontSize: '1.1rem',
          color: 'rgba(255, 255, 255, 0.7)',
          width: '100%',
          maxWidth: '100%',
          wordWrap: 'break-word'
        }}>
          Here are some of the technologies I work with:
        </p>
      </div>
    </section>
  );
};

export default HeroSection;