import React from 'react';
import DomeGallery from '../components/DomeGallery/DomeGallery';

// Import all videos
import Video1 from '../assets/dome/Video_1.mp4';
import Video2 from '../assets/dome/video_2.mp4';
import Video3 from '../assets/dome/video_3.mp4';

// Import all images
import Image2 from '../assets/dome/image_2.jpg';
import Image3 from '../assets/dome/image_3.jpg';
import Image4 from '../assets/dome/image_4.jpg';
import Image5 from '../assets/dome/image_5.jpg';
import Image6 from '../assets/dome/image_6.jpg';
import Image7 from '../assets/dome/image_7.jpg';
import Image8 from '../assets/dome/image_8.jpg';
import Image9 from '../assets/dome/image_9.jpg';
import Image10 from '../assets/dome/image_10.jpg';
import Image11 from '../assets/dome/image_11.jpg';
import Image12 from '../assets/dome/image_12.jpg';

import './GalleryPage.css';

const GalleryPage = () => {
  // Gallery items using actual assets
  const galleryItems = [
    {
      src: Image2,
      alt: 'Project Image 2',
      type: 'image'
    },
    {
      src: Video1,
      alt: 'Project Demo Video 1',
      type: 'video'
    },
    {
      src: Image3,
      alt: 'Project Image 3',
      type: 'image'
    },
    {
      src: Image4,
      alt: 'Project Image 4',
      type: 'image'
    },
    {
      src: Video2,
      alt: 'Project Demo Video 2',
      type: 'video'
    },
    {
      src: Image5,
      alt: 'Project Image 5',
      type: 'image'
    },
    {
      src: Image6,
      alt: 'Project Image 6',
      type: 'image'
    },
    {
      src: Image7,
      alt: 'Project Image 7',
      type: 'image'
    },
    {
      src: Video3,
      alt: 'Project Demo Video 3',
      type: 'video'
    },
    {
      src: Image8,
      alt: 'Project Image 8',
      type: 'image'
    },
    {
      src: Image9,
      alt: 'Project Image 9',
      type: 'image'
    },
    {
      src: Image10,
      alt: 'Project Image 10',
      type: 'image'
    },
    {
      src: Image11,
      alt: 'Project Image 11',
      type: 'image'
    },
    {
      src: Image12,
      alt: 'Project Image 12',
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