import React from 'react';
import DomeGallery from '../components/DomeGallery/DomeGallery';
import Video1 from '../assets/Video_1.mp4';
import './GalleryPage.css';

const GalleryPage = () => {
  // Sample media items - using working video URLs
  const galleryItems = [
    {
      src: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop',
      alt: 'AI Project Screenshot',
      type: 'image'
    },
    {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      alt: 'Web Development Demo',
      type: 'video'
    },
    {
      src: 'https://ischool.syracuse.edu/wp-content/uploads/what-is-machine-learning.png',
      alt: 'Machine Learning',
      type: 'image'
    },
    {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      alt: 'IoT Project Demo', 
      type: 'video'
    },
    {
      src: 'https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=800&h=600&fit=crop',
      alt: 'Full Stack Development',
      type: 'image'
    },
    {
      src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      alt: 'Code Architecture Demo',
      type: 'video'
    },
    {
      src: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
      alt: 'Software Engineering',
      type: 'image'
    },
    {
      src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
      alt: 'Analytics Dashboard',
      type: 'image'
    }
  ];

  // Add debug logging
  console.log('Gallery items being passed to DomeGallery:', galleryItems);

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

      <DomeGallery 
        segments={20}
        minRadius={800}
        images={galleryItems}
        grayscale={false}
      />

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