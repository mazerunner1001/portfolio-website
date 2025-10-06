import React from 'react';
import './AboutSection.css';
import { FaCode, FaCubes, FaFileAlt } from 'react-icons/fa';
import CVFile from '../assets/CV_Praneeth_Chandra.pdf';

const AboutSection = () => {
  const handleDownloadCV = () => {
    const link = document.createElement('a');
    link.href = CVFile;
    link.download = 'Praneeth_Chandra_CV.pdf';
    link.click();
  };

  const handleViewProjects = () => {
    const projectsSection = document.getElementById('projects');
    if (projectsSection) {
      projectsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const stats = [
    {
      number: "8.06",
      label: "CGPA",
      description: "IIT (BHU) Varanasi"
    },
    {
      number: "7375",
      label: "JEE Advanced Rank",
      description: "All India Rank"
    },
    {
      number: "15+",
      label: "Key Projects",
      description: "AI/ML, IoT, Full-stack"
    },
    {
      number: "2nd",
      label: "Position ML Forge",
      description: "At Shilp'25, by CES IIT(BHU)"
    }
  ];

  const services = [
    {
      icon: FaCode,
      title: "Front-end Development",
      description: "Creating responsive and interactive user interfaces using modern frameworks like React, Vue, and cutting-edge CSS technologies."
    },
    {
      icon: FaCubes,
      title: "AI/ML Solutions",
      description: "Developing intelligent systems using PyTorch, TensorFlow, and BERT for NLP, computer vision, and data analysis projects."
    },
    {
      icon: FaFileAlt,
      title: "Full-stack Development",
      description: "Building complete web applications with Node.js, Spring Boot, and databases like MongoDB, PostgreSQL for scalable solutions."
    }
  ];

  return (
    <section id="about" className="about-section">
      <div className="container">
        <div className="about-content">
          <div className="about-text">
            <h2 className="about-title">About Me</h2>
            <div className="about-description">
              <p>
                I'm a Computer Science student at IIT (BHU) Varanasi with a strong passion for 
                Artificial Intelligence, Machine Learning, and Full-stack Development. Currently 
                pursuing my B.Tech degree with a CGPA of 8.06/10.
              </p>
              <p>
                With expertise in AI/ML frameworks (PyTorch, TensorFlow) and modern web technologies 
                (React.JS, Node.JS, Spring Boot), I've worked as a SWE Intern at Trumio Inc and led 
                multiple successful projects in NLP, IoT, and web development.
              </p>
            </div>
            
            <div className="about-cta">
              <button className="download-cv-btn">
                Download CV
              </button>
              <button className="view-projects-btn">
                View Projects
              </button>
            </div>
          </div>

          <div className="about-stats">
            <h3 className="stats-title">Quick Stats</h3>
            <div className="stats-grid">
              {stats.map((stat, index) => (
                <div key={index} className="stat-card">
                  <div className="stat-number">{stat.number}</div>
                  <div className="stat-label">{stat.label}</div>
                  <div className="stat-description">{stat.description}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* My Services Section */}
        <div className="services-section">
          <div className="services-header">
            <h2 className="services-title">My Services</h2>
          </div>
          <div className="services-grid">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="service-card">
                  <div className="service-icon">
                    <IconComponent />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;