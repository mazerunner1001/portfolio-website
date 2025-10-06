import React, { useState, useEffect, useRef } from 'react';
import './Navigation.css';
import { FaHome, FaFolder, FaTools, FaBriefcase, FaEnvelope } from 'react-icons/fa';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const scrollTimeoutRef = useRef(null);
  const observerRef = useRef(null);

  const navItems = [
    { id: 'home', icon: FaHome, href: '#home' },
    { id: 'about', icon: FaFolder, href: '#about' },
    { id: 'projects', icon: FaTools, href: '#projects' },
    { id: 'experience', icon: FaBriefcase, href: '#experience' },
    { id: 'contact', icon: FaEnvelope, href: '#contact' }
  ];

  useEffect(() => {
    const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
    
    observerRef.current = new IntersectionObserver(
      (entries) => {
        // Only update active section if user is not manually navigating
        if (!isUserScrolling) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(entry.target.id);
            }
          });
        }
      },
      {
        threshold: 0.5,
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    sections.forEach((section) => observerRef.current.observe(section));

    return () => {
      if (observerRef.current) {
        sections.forEach((section) => observerRef.current.unobserve(section));
      }
    };
  }, [isUserScrolling]);

  const handleNavClick = (id) => {
    // Immediately set the active section
    setActiveSection(id);
    
    // Disable intersection observer temporarily
    setIsUserScrolling(true);
    
    // Clear any existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }
    
    // Smooth scroll to section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Re-enable intersection observer after scroll completes
    scrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false);
    }, 1000); // Adjust timeout based on scroll duration
  };

  // Also handle manual scrolling (not clicking nav buttons)
  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      // If user is manually scrolling (not from nav click), reset the flag faster
      if (!isUserScrolling) return;
      
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        setIsUserScrolling(false);
      }, 150);
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isUserScrolling]);

  return (
    <nav className="navigation">
      <div className="nav-container">
        <div className="nav-pills">
          {navItems.map((item) => {
            const IconComponent = item.icon;
            return (
              <button
                key={item.id}
                className={`nav-pill ${activeSection === item.id ? 'active' : ''}`}
                onClick={() => handleNavClick(item.id)}
                title={item.id.charAt(0).toUpperCase() + item.id.slice(1)}
              >
                <IconComponent className="nav-icon" />
              </button>
            );
          })}
          <div 
            className="nav-indicator" 
            style={{
              transform: `translateX(${navItems.findIndex(item => item.id === activeSection) * (58)}px)`
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;