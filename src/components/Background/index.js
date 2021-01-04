import React from 'react';
import Particle from './Particle';
import { useSpring, animated } from 'react-spring';

const Background = ({ song }) => {
  const color = [
    'linear-gradient(#11114e, #96cbea)',
    'linear-gradient(#f6b2bd, #96cbea)',
    'linear-gradient(#72d472, #96cbea)',
    'linear-gradient(#f76c6b, #96cbea)',
    'linear-gradient(#778899, #96cbea)',
  ];

  const props = useSpring({
    to: { background: color[song] },
    config: { duration: 1000 },
  });

  return (
    <animated.div
      style={{
        position: 'fixed',
        top: '0px',
        left: '0px',
        width: '100vw',
        height: '100vh',
        zIndex: '-500',
        ...props,
      }}
    >
      <Particle song={song} />
    </animated.div>
  );
};

export default Background;
