import React from 'react';
import './AboutSection.css';
import { FaCode, FaCubes, FaFileAlt } from 'react-icons/fa';

const AboutSection = () => {
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
                I'm a Computer Science student at Indian Institute of Technology (BHU) Varanasi 
                with a strong passion for Artificial Intelligence, Machine Learning, and Full-stack 
                Development. Currently pursuing my B.Tech degree with a CGPA of 8.06/10.
              </p>
              <p>
                I secured All India Rank 7375 in JEE Advanced 2022 and have been consistently 
                excelling in my academic journey. My expertise spans across Data Structures & Algorithms, 
                AI/ML frameworks (PyTorch, TensorFlow, FastAPI), and modern web technologies 
                (React.JS, Node.JS, MongoDB, PostgreSQL).
              </p>
              <p>
                I've worked as a SWE Intern at Trumio Inc, where I built an AI-powered Agentic 
                system and optimized data pipelines. I'm also an active Core Committee Member at 
                DFZ (Dance Club, IIT BHU), serving my team for 2 years and leading them to a 3rd 
                place finish in Dance Arts at Inter-IIT 7.0.
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
      </div>
    </section>
  );
};

export default AboutSection;