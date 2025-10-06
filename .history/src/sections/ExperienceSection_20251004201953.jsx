import React from 'react';
import './ExperienceSection.css';
import { FaCalendarAlt, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';

const ExperienceSection = () => {
  const experiences = [
    {
      id: 1,
      company: "Trumio Inc (AI & ML Pvt. Ltd.)",
      position: "SWE Intern",
      location: "Remote",
      period: "May 25 - Jul 25",
      type: "Internship",
      description: "Worked on building an AI-powered Agentic system with multimodal chat and NL-to-MongoDB analytics capabilities. Integrated intelligent memory systems with RAG architecture.",
      achievements: [
        "Built an AI-powered Agentic system with multimodal chat capabilities",
        "Implemented NL-to-MongoDB analytics with intelligent memory system",
        "Integrated RAG architecture with LlamaIndex and Pinecone vector DB",
        "Implemented MCP (Model Control Protocol) for secure file handling",
        "Set up exposure to System architecture, modular APIs, streaming systems, and scalable architecture design (RAG, LLM, Search)"
      ],
      technologies: ["Python", "FastAPI", "MongoDB", "LlamaIndex", "RAG", "Pinecone", "AI/ML"]
    }
  ];

  const education = [
    {
      id: 1,
      institution: "Indian Institute of Technology (BHU), Varanasi",
      degree: "Bachelor of Technology",
      field: "Computer Science and Engineering",
      period: "2022 - 2026",
      grade: "CGPA: 8.06/10"
    },
    {
      id: 2,
      institution: "Narayana Junior College",
      degree: "Intermediate (Class 12)",
      field: "MPC Stream",
      period: "2022",
      grade: "Percentage: 96.7%"
    },
    {
      id: 3,
      institution: "New Vision Olympic School",
      degree: "Secondary Education (Class 10)",
      field: "CBSE",
      period: "2020",
      grade: "GPA: 10/10"
    }
  ];

  return (
    <section id="experience" className="experience-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Experience & Education</h2>
          <p className="section-subtitle">
            My professional journey and academic background
          </p>
        </div>

        <div className="experience-content">
          {/* Work Experience */}
          <div className="experience-column">
            <h3 className="column-title">
              <FaBriefcase className="column-icon" />
              Work Experience
            </h3>
            
            <div className="experience-timeline">
              {experiences.map((exp, index) => (
                <div key={exp.id} className="experience-item">
                  <div className="experience-marker"></div>
                  <div className="experience-card">
                    <div className="experience-header">
                      <div className="experience-main">
                        <h4 className="experience-position">{exp.position}</h4>
                        <h5 className="experience-company">{exp.company}</h5>
                      </div>
                      <div className="experience-meta">
                        <span className="experience-type">{exp.type}</span>
                        <div className="experience-details">
                          <span className="experience-period">
                            <FaCalendarAlt /> {exp.period}
                          </span>
                          <span className="experience-location">
                            <FaMapMarkerAlt /> {exp.location}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    <p className="experience-description">{exp.description}</p>
                    
                    <div className="experience-achievements">
                      <h6>Key Achievements:</h6>
                      <ul>
                        {exp.achievements.map((achievement, idx) => (
                          <li key={idx}>{achievement}</li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="experience-technologies">
                      {exp.technologies.map((tech, idx) => (
                        <span key={idx} className="tech-tag">{tech}</span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="education-column">
            <h3 className="column-title">
              <FaBriefcase className="column-icon" />
              Education
            </h3>
            
            {education.map((edu) => (
              <div key={edu.id} className="education-card">
                <div className="education-header">
                  <h4 className="education-degree">{edu.degree}</h4>
                  <span className="education-period">{edu.period}</span>
                </div>
                <h5 className="education-field">{edu.field}</h5>
                <h6 className="education-institution">{edu.institution}</h6>
                <p className="education-grade">{edu.grade}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;