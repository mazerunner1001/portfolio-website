import React, { useState, useEffect } from 'react';
import './Navigation.css';
import { FaHome, FaFolder, FaTools, FaBriefcase, FaEnvelope } from 'react-icons/fa';

const Navigation = () => {
  const [activeSection, setActiveSection] = useState('home');

  const navItems = [
    { id: 'home', icon: FaHome, href: '#home' },
    { id: 'about', icon: FaFolder, href: '#about' },
    { id: 'projects', icon: FaTools, href: '#projects' },
    { id: 'experience', icon: FaBriefcase, href: '#experience' },
    { id: 'contact', icon: FaEnvelope, href: '#contact' }
  ];

  useEffect(() => {
    const sections = navItems.map(item => document.getElementById(item.id)).filter(Boolean);
    
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '-20% 0px -20% 0px'
      }
    );

    sections.forEach((section) => observer.observe(section));

    return () => {
      sections.forEach((section) => observer.unobserve(section));
    };
  }, []);

  const handleNavClick = (id) => {
    setActiveSection(id);
    
    // Smooth scroll to section
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

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
              transform: `translateX(${navItems.findIndex(item => item.id === activeSection) * (52 + 4)}px)`
            }}
          />
        </div>
      </div>
    </nav>
  );
};

export default Navigation;