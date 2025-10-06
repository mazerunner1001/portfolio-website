import React, { useState } from 'react';
import './ProjectsSection.css';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

// Import project images
import ShlokaImage from '../assets/SHLOKA.png';
import QlvpImage from '../assets/QLVP.png';
import DbmsImage from '../assets/DBMS.png';
import NovaImage from '../assets/NOVA.png';
import RisImage from '../assets/RIS.png';

const ProjectsSection = () => {
  const [showAllProjects, setShowAllProjects] = useState(false);
  const projects = [
    {
      id: 1,
      title: "SHLOKAPROCESSOR | UG Project",
      description: "Developed an modular NLP pipeline for Sanskrit to address the absence of standard computational tools for the language. Designed hybrid models (BiLSTM, CNN, transformers, BERT) achieving 92.2% F1 in morphological parsing, outperforming prior benchmarks.",
      image: ShlokaImage,
      tags: ["Python", "BiLSTM", "CNN", "BERT", "Transformers", "NLP"],
      githubUrl: "#",
      liveUrl: "#",
      featured: true
    },
    {
      id: 2,
      title: "QLVP Routing Algorithm | IoT Lab",
      description: "Developed a Python-based routing algorithm for vehicle-to-vehicle communication in IoV. Optimized routing decisions using Q-Learning to ensure low-latency, safe trajectory prediction, reducing packet loss and routing failures while improving link reliability.",
      image: QlvpImage,
      tags: ["Python", "Q-Learning", "IoT", "Routing Algorithms"],
      githubUrl: "#",
      liveUrl: "#",
      featured: true
    },
    {
      id: 3,
      title: "DBMS Project | Spring Boot + React + MySQL",
      description: "Developed a relational DBMS (MySQL) with normalized relational database schema. Implemented a Spring Boot Maven backend with JPA for efficient role-based access. Built with React + Tailwind frontend for seamless user interaction.",
      image: DbmsImage,
      tags: ["Spring Boot", "React", "MySQL", "JPA", "Tailwind"],
      githubUrl: "#",
      liveUrl: "#",
      featured: true
    },
    {
      id: 4,
      title: "IMDB-Style Movie Information App",
      description: "Built an extensive IMDB-style Movie Information app using MERN stack. Features: Personalized Feed, Posts, Comments, Profile Customization, Pagination, JWT Authentication using WebSockets.",
      image: NovaImage,
      tags: ["MongoDB", "Express", "React", "Node.js", "JWT", "WebSockets"],
      githubUrl: "#",
      liveUrl: "#",
      featured: false
    },
    {
      id: 5,
      title: "RIS-Assisted Sensor Localization",
      description: "Applied MLE and Bayesian learning frameworks with Bayesian estimation algorithm for efficient RIS-assisted sensor localization. Demonstrated practical use for low-cost, energy-efficient IoT positioning via stochastic sub-beam UEs scheduling.",
      image: RisImage,
      tags: ["Python", "MLE", "Bayesian Learning", "IoT"],
      githubUrl: "#",
      liveUrl: "#",
      featured: false
    },
    {
      id: 6,
      title: "TheDiscourse | Django Project",
      description: "Built a Python-based Debate App using Django to facilitate open discussions on social issues. Features: Dynamic search, Realtime Updates, Authentication, Conversation Navigation, profile customization, CRUD functionality.",
      image: null, // No image provided for this project
      tags: ["Python", "Django", "PostgreSQL", "WebSockets"],
      githubUrl: "#",
      liveUrl: "#",
      featured: false
    }
  ];

  return (
    <section id="projects" className="projects-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Recent Projects and Achievements</h2>
          <p className="section-subtitle">
            Showcasing my latest work in web development and software engineering
          </p>
        </div>

        <div className="projects-grid">
          {projects.map((project) => (
            <div 
              key={project.id} 
              className={`project-card ${project.featured ? 'featured' : ''}`}
            >
              <div className="project-image">
                {project.image ? (
                  <img src={project.image} alt={project.title} />
                ) : (
                  <div className="project-placeholder">
                    <span>No Image</span>
                  </div>
                )}
                <div className="project-overlay">
                  <div className="project-links">
                    <a href={project.githubUrl} className="project-link">
                      <FaGithub />
                    </a>
                    <a href={project.liveUrl} className="project-link">
                      <FaExternalLinkAlt />
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                
                <div className="project-tags">
                  {project.tags.map((tag, index) => (
                    <span key={index} className="project-tag">{tag}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="projects-cta">
          <button className="view-all-btn">View All Projects</button>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;