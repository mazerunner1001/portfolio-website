import React, { useState, useEffect, useRef } from 'react';
import './Navigation.css';
import { FaHome, FaFolder, FaTools, FaBriefcase, FaQuestionCircle, FaEnvelope } from 'react-icons/fa';
import Terminal from '../Terminal/Terminal';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isUserScrolling, setIsUserScrolling] = useState(false);
  const [isCLIMode, setIsCLIMode] = useState(false);
  const [isTerminalOpen, setIsTerminalOpen] = useState(false);
  const [isTerminalMaximized, setIsTerminalMaximized] = useState(false);
  const scrollTimeoutRef = useRef(null);

  const navItems = [
    { id: 'home', icon: FaHome, href: '#home' },
    { id: 'about', icon: FaFolder, href: '#about' },
    { id: 'projects', icon: FaTools, href: '#projects' },
    { id: 'experience', icon: FaBriefcase, href: '#experience' },
    { id: 'faq', icon: FaQuestionCircle, href: '#faq' },
    { id: 'contact', icon: FaEnvelope, href: '#contact' }
  ];

  useEffect(() => {
    let scrollTimeout;
    
    const handleScroll = () => {
      // Only update active section if user is not manually navigating
      if (isUserScrolling) return;
      
      // Debounce scroll events to prevent rapid updates
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
        const scrollPosition = window.scrollY + window.innerHeight / 2;
        
        let activeSection = 'home'; // default
        
        for (let i = sections.length - 1; i >= 0; i--) {
          const section = sections[i];
          if (section.offsetTop <= scrollPosition) {
            activeSection = section.id;
            break;
          }
        }
        
        setActiveSection(activeSection);
      }, 50); // 50ms debounce
    };

    // Initial check
    if (!isUserScrolling) {
      handleScroll();
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(scrollTimeout);
    };
  }, [isUserScrolling]);

  const handleNavClick = (id) => {
    // Immediately set the active section
    setActiveSection(id);
    
    // Disable scroll detection immediately and for longer duration
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
    
    // Re-enable scroll detection after scroll animation definitely completes
    // Increased timeout to ensure smooth scrolling finishes
    scrollTimeoutRef.current = setTimeout(() => {
      setIsUserScrolling(false);
    }, 1500); // Increased from 1000ms to 1500ms
  };

  const handleCLIToggle = () => {
    setIsCLIMode(!isCLIMode);
    if (!isCLIMode) {
      setIsTerminalOpen(true);
    } else {
      setIsTerminalOpen(false);
      setIsTerminalMaximized(false);
    }
  };

  const handleTerminalClose = () => {
    setIsTerminalOpen(false);
    setIsCLIMode(false);
    setIsTerminalMaximized(false);
  };

  const handleTerminalMinimize = () => {
    setIsTerminalOpen(false);
    setIsCLIMode(false);
    setIsTerminalMaximized(false);
  };

  const handleTerminalMaximize = () => {
    setIsTerminalMaximized(!isTerminalMaximized);
  };

  return (
    <>
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
      
      {/* CLI/GUI Toggle Buttons - Top Right */}
      <div className="mode-toggle">
        <div className="mode-pills">
          <button
            className={`mode-pill ${!isCLIMode ? 'active' : ''}`}
            onClick={() => !isCLIMode ? null : handleCLIToggle()}
            title="GUI Mode"
          >
            GUI
          </button>
          <button
            className={`mode-pill ${isCLIMode ? 'active' : ''}`}
            onClick={() => isCLIMode ? null : handleCLIToggle()}
            title="CLI Mode"
          >
            CLI
          </button>
          <div 
            className="mode-indicator" 
            style={{
              transform: `translateX(${isCLIMode ? '60px' : '0px'})`
            }}
          />
        </div>
      </div>
      
      {/* Terminal Component */}
      <Terminal
        isOpen={isTerminalOpen}
        onClose={handleTerminalClose}
        onMinimize={handleTerminalMinimize}
        onMaximize={handleTerminalMaximize}
        isMaximized={isTerminalMaximized}
      />
    </>
  );
};

export default Navigation;