import React from 'react';
import LogoLoop from '../animations/LogoLoop/LogoLoop';
import { techLogos } from '../data/techStack.jsx';

const TechStackSection = () => {
  return (
    <div style={{ 
      height: '200px',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      width: '100%'
    }}>
      <div style={{ 
        width: '100%', 
        height: '160px',
        display: 'flex',
        alignItems: 'center'
      }} data-logoloop>
        <LogoLoop
          logos={techLogos}
          speed={40}
          direction="left"
          logoHeight={48}
          gap={40}
          pauseOnHover={true}
          scaleOnHover={true}
          fadeOut={true}
          fadeOutColor="#070311"
          ariaLabel="Technology stack"
          width="100%"
        />
      </div>
    </div>
  );
};

export default TechStackSection;