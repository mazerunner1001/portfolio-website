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
  const [isMobile, setIsMobile] = useState(false);
  const [isTablet, setIsTablet] = useState(false);
  const [hideButtons, setHideButtons] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.pageYOffset > 300);
    };

    const handleResize = () => {
      const width = window.innerWidth;
      setIsMobile(width < 1200);
      setIsTablet(width < 1000);
      setHideButtons(width < 800);
    };

    // Initial check
    handleResize();

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
  return (
    <div style={{ position: 'relative', zIndex: 10 }}>
      <Navigation isMobile={hideButtons} />
      
      {/* Main Container - Responsive Layout */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: isMobile ? '100%' : '85%',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: isMobile ? 'column' : 'row',
        margin: '0 auto',
        gap: isMobile ? '0' : '2rem',
        overflow: 'visible',
        padding: isMobile ? '0' : '0'
      }}>
        {/* Profile Section - Top on mobile, Left on desktop */}
                {/* Profile Section - Top on mobile, Left on desktop */}
        <ProfileSection isMobile={isMobile} isTablet={isTablet} hideButtons={hideButtons} />
        
        {/* All Content - Below profile on mobile, Right side on desktop */}
        <div className="content-main" style={{
          width: isMobile ? '100%' : '68%',
          flexGrow: 1,
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: isMobile ? '20px' : '80px 0 0 0',
          boxSizing: 'border-box',
          alignItems: isTablet ? 'center' : 'stretch',
          textAlign: isTablet ? 'center' : 'left',
          maxWidth: isTablet ? '100vw' : 'none'
        }}>
          {/* Hero Content */}
          <div id="home" style={{
            height: isMobile ? 'auto' : '80vh',
            minHeight: isMobile ? '60vh' : 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: isMobile ? 'flex-start' : 'center',
            padding: isMobile ? '20px 0' : '0'
          }}>
            <ContentSection />
          </div>

          {/* Additional Sections */}
          <div id="about" style={{ width: '100%' }}>
            <AboutSection />
          </div>
          <div id="projects" style={{ width: '100%' }}>
            <ProjectsSection />
          </div>
          <div id="experience" style={{ width: '100%' }}>
            <ExperienceSection />
          </div>
          <div id="faq" style={{ width: '100%' }}>
            <FAQSection />
          </div>
          <div id="contact" style={{ width: '100%' }}>
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
  );
};

export default MainLayout;