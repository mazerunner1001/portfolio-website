import React from 'react';
import DomeGallery from '../components/DomeGallery/DomeGallery';
import './GalleryPage.css';

const GalleryPage = () => {
  // Sample media items - using images for now since DomeGallery supports images
  const galleryItems = [
    {
      src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop',
      alt: 'AI Project Screenshot'
    },
    {
      src: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=800&h=600&fit=crop',
      alt: 'Web Development'
    },
    {
      src: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=800&h=600&fit=crop',
      alt: 'Machine Learning'
    },
    {
      src: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&h=600&fit=crop',
      alt: 'IoT Project'
    },
    {
      src: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop',
      alt: 'Full Stack Development'
    },
    {
      src: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=800&h=600&fit=crop',
      alt: 'Code Architecture'
    },
    {
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop',
      alt: 'Data Science'
    },
    {
      src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
      alt: 'Software Engineering'
    },
    {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      alt: 'Analytics Dashboard'
    },
    {
      src: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&h=600&fit=crop',
      alt: 'Mobile Development'
    }
  ];

  const handleBackToPortfolio = () => {
    window.history.back();
  };

  return (
    <div className="gallery-page">
      <div className="gallery-header">
        <button className="back-btn" onClick={handleBackToPortfolio}>
          ← Back to Portfolio
        </button>
        <div className="gallery-title-section">
          <h1 className="gallery-title">My World</h1>
          <p className="gallery-subtitle">
            Explore my journey through projects, experiences, and creative endeavors
          </p>
        </div>
      </div>

      <div className="gallery-content">
        <div className="dome-gallery-wrapper">
          <DomeGallery 
            images={galleryItems}
            grayscale={false}
            fit={0.6}
            maxVerticalRotationDeg={8}
            dragSensitivity={15}
            segments={30}
            imageBorderRadius="20px"
            openedImageBorderRadius="20px"
          />
        </div>
      </div>

      <div className="gallery-footer">
        <p className="gallery-description">
          Each image and video represents a milestone in my development journey - 
          from AI/ML projects to full-stack applications, showcasing the diverse 
          range of technologies and solutions I've worked with.
        </p>
      </div>
    </div>
  );
};

export default GalleryPage;