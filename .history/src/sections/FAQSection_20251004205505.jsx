import React, { useState } from 'react';
import './FAQSection.css';
import { FaPlus, FaMinus } from 'react-icons/fa';

const FAQSection = () => {
  const [openItems, setOpenItems] = useState(new Set());

  const toggleItem = (index) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) {
      newOpenItems.delete(index);
    } else {
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  const faqs = [
    {
      question: "What technologies do you specialize in?",
      answer: "I specialize in AI/ML technologies like PyTorch, TensorFlow, and BERT for NLP tasks. For full-stack development, I work with React.js, Node.js, Spring Boot, and databases like MongoDB and PostgreSQL. I also have experience with cloud platforms and modern DevOps practices."
    },
    {
      question: "Are you available for freelance projects?",
      answer: "Yes, I'm available for freelance projects, especially those involving AI/ML solutions, full-stack web development, or IoT systems. I'm particularly interested in projects that challenge me to apply cutting-edge technologies to solve real-world problems."
    },
    {
      question: "What's your experience with AI/ML projects?",
      answer: "I have hands-on experience building AI-powered systems, including NLP models with BERT, computer vision applications, and intelligent memory systems with RAG architecture. During my internship at Trumio Inc, I developed multimodal chat capabilities and NL-to-MongoDB analytics systems."
    },
    {
      question: "How do you approach new projects?",
      answer: "I start by understanding the core problem and requirements, then design a scalable architecture. I prioritize clean, maintainable code and follow agile development practices. I also ensure proper testing and documentation throughout the development process."
    },
    {
      question: "What makes you different from other developers?",
      answer: "My unique combination of strong academic foundation (IIT BHU), practical industry experience, and diverse project portfolio sets me apart. I bridge the gap between theoretical AI/ML concepts and practical implementation, while maintaining high code quality and user experience standards."
    },
    {
      question: "How can we collaborate on a project?",
      answer: "I'm open to various collaboration models - from short-term consulting to long-term partnerships. We can start with a discovery call to discuss your requirements, timeline, and budget. I believe in transparent communication and regular progress updates throughout the project."
    }
  ];

  return (
    <section id="faq" className="faq-section">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Frequently Asked Questions</h2>
          <p className="section-subtitle">
            Got questions? Here are some answers to commonly asked questions about my work and expertise.
          </p>
        </div>

        <div className="faq-container">
          {faqs.map((faq, index) => (
            <div key={index} className={`faq-item ${openItems.has(index) ? 'open' : ''}`}>
              <button 
                className="faq-question"
                onClick={() => toggleItem(index)}
                aria-expanded={openItems.has(index)}
              >
                <span>{faq.question}</span>
                <span className="faq-icon">
                  {openItems.has(index) ? <FaMinus /> : <FaPlus />}
                </span>
              </button>
              <div className="faq-answer">
                <div className="faq-content">
                  <p>{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;