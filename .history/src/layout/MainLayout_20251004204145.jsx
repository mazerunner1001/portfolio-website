import React from 'react';
import Navigation from '../components/Navigation/Navigation';
import ProfileSection from '../sections/ProfileSection';
import ContentSection from '../sections/ContentSection';
import AboutSection from '../sections/AboutSection';
import ProjectsSection from '../sections/ProjectsSection';
import ExperienceSection from '../sections/ExperienceSection';
import FAQSection from '../sections/FAQSection';
import ContactSection from '../sections/ContactSection';

const MainLayout = () => {
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
          <div id="contact">
            <ContactSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainLayout;