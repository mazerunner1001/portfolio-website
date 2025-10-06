import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation/Navigation';
import ProfileSection from '../sections/ProfileSection';
import ContentSection from '../sections/ContentSection';
import AboutSection from '../sections/AboutSection';
import ProjectsSection from '../sections/ProjectsSection';
import ExperienceSection from '../sections/ExperienceSection';
import FAQSection from '../sections/FAQSection';
import ContactSection from '../sections/ContactSection';

const MainLayout = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);

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
        <ProfileSection />
        
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
            left: '20px',
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
  );
};

export default MainLayout;