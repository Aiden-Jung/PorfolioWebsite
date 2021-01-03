import { useState, useEffect } from 'react';

const useWindowSize = () => {
  const [windowSize, setSize] = useState([
    window.innerWidth,
    window.innerHeight,
  ]);

  useEffect(() => {
    const onResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    window.addEventListener('resize', onResize);

    return () => {
      window.removeEventListener('resize', onResize);
    };
  }, []);
  return windowSize;
};

export default useWindowSize;
