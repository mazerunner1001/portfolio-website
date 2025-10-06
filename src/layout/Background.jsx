import React from 'react';
import Squares from '../components/Squares/Squares';

const Background = () => {
  return (
    <div style={{
      width: '100%',
      height: '100vh',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: -1, // Behind everything
      display: 'block',
      overflow: 'hidden',
      opacity: 0.7
    }}>
      <div style={{
        width: '100%',
        height: '100%',
        display: 'block'
      }}>
        <Squares
          speed={0.3}
          squareSize={35}
          direction='diagonal'
          borderColor='#392e4e'
          hoverFillColor='#222222'
        />
      </div>
    </div>
  );
};

export default Background;