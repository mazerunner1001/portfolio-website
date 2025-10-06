import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation/Navigation';
import ProfileSection from '../sections/ProfileSection';
import ContentSection from '../sections/ContentSection';
import AboutSection from '../sections/AboutSection';
import ProjectsSection from '../sections/ProjectsSection';
import ExperienceSection from '../sections/ExperienceSection';
import FAQSection from '../sections/FAQSection';
import ContactSection from '../sections/ContactSection';
import Lanyard from '../components/Lanyard/Lanyard';

const MainLayout = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isSimpleLanyard, setIsSimpleLanyard] = useState(true);

  const toggleLanyard = () => {
    setIsSimpleLanyard(!isSimpleLanyard);
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <>
      {/* 3D Lanyard positioned absolutely at the very top level - FULL VIEWPORT FREEDOM */}
      {!isSimpleLanyard && (
        <div style={{
          position: 'fixed',
          top: '0',
          left: '0',
          width: '100vw', // FULL viewport width
          height: '100vh', // FULL viewport height
          zIndex: 500, // Higher than everything else
          pointerEvents: 'auto',
          opacity: !isSimpleLanyard ? 1 : 0,
          transition: 'opacity 0.5s ease',
          overflow: 'visible' // Allow complete overflow
        }}>
          <div style={{
            position: 'absolute',
            // Move LEFT to where the profile section is: 7.5% (left margin) + 16% (center of 32% profile width)
            left: '16%', 
            top: '50%', // Center vertically like SimpleLanyard
            width: '100%',
            height: '100%',
            transform: 'translateY(-50%)', // Center vertically
            overflow: 'visible'
          }}>
            <Lanyard />
          </div>
        </div>
      )}

      <div style={{ position: 'relative', zIndex: 10 }}>
        <Navigation />
        
        {/* Main Container with Profile on Left and All Content on Right */}
        <div style={{
          position: 'relative',
          zIndex: 10,
          width: '85%',
          minHeight: '100vh',
          display: 'flex',
          margin: '0 auto', // Center the entire content
          gap: '2rem' // Reduced gap between sections
        }}>
          {/* Profile Section - Left Side (fixed width container) */}
          <ProfileSection isSimpleLanyard={isSimpleLanyard} toggleLanyard={toggleLanyard} />
        
        {/* All Content - Right Side */}
        <div className="content-main" style={{
          width: '68%',
          flexGrow: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: '80px 0 0 0',
          boxSizing: 'border-box'
        }}>
          {/* Hero Content */}
          <div id="home" style={{
            height: '80vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center'
          }}>
            <ContentSection />
          </div>

          {/* Additional Sections */}
          <div id="about">
            <AboutSection />
          </div>
          <div id="projects">
            <ProjectsSection />
          </div>
          <div id="experience">
            <ExperienceSection />
          </div>
          <div id="faq">
            <FAQSection />
          </div>
          <div id="contact">
            <ContactSection />
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            width: '50px',
            height: '50px',
            borderRadius: '50%',
            backgroundColor: 'rgba(168, 85, 247, 0.9)',
            border: 'none',
            color: 'white',
            fontSize: '20px',
            cursor: 'pointer',
            zIndex: 1000,
            transition: 'all 0.3s ease',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'SF Mono, Menlo, Monaco, "Cascadia Code", "Roboto Mono", Consolas, "Courier New", monospace',
            backdropFilter: 'blur(10px)',
            boxShadow: '0 4px 15px rgba(168, 85, 247, 0.3)',
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = 'rgba(168, 85, 247, 1)';
            e.target.style.transform = 'scale(1.1)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = 'rgba(168, 85, 247, 0.9)';
            e.target.style.transform = 'scale(1)';
          }}
        >
          ↑
        </button>
      )}
      </div>
    </>
  );
};

export default MainLayout;