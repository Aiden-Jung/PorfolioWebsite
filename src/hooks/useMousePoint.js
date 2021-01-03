import { useState, useEffect } from 'react';

const useMousePoint = () => {
  const [point, setPoint] = useState([0, 0]);
  const [dragWindow, setDragWindow] = useState(false);
  const [dragMobile, setDragMobile] = useState(false);

  useEffect(() => {
    const setFromEventWindow = (e) => {
      if (dragWindow) {
        const halfX = window.innerWidth / 2;
        const halfY = window.innerHeight / 2;
        const x = (e.clientX - halfX) / halfX;
        const y = (halfY - e.clientY) / halfY;
        setPoint([x > 1 ? 1 : x < -1 ? -1 : x, y > 1 ? 1 : y < -1 ? -1 : y]);
      }
    };

    const setMouseDownWindow = () => setDragWindow(true);
    const setMouseUpWindow = () => setDragWindow(false);

    window.addEventListener('mousemove', setFromEventWindow);
    window.addEventListener('mousedown', setMouseDownWindow);
    window.addEventListener('mouseup', setMouseUpWindow);

    return () => {
      window.removeEventListener('mousemove', setFromEventWindow);
      window.removeEventListener('mousedown', setMouseDownWindow);
      window.removeEventListener('mouseup', setMouseUpWindow);
    };
  }, [dragWindow]);

  useEffect(() => {
    const setFromEventMobile = (e) => {
      if (dragMobile) {
        const touches = e.changedTouches[0];
        const halfX = window.innerWidth / 2;
        const halfY = window.innerHeight / 2;
        const x = (touches.clientX - halfX) / halfX;
        const y = (halfY - touches.clientY) / halfY;
        setPoint([x, y]);
      }
    };

    const setMouseDownMobile = () => setDragMobile(true);
    const setMouseUpMobile = () => setDragMobile(false);

    window.addEventListener('touchmove', setFromEventMobile);
    window.addEventListener('touchstart', setMouseDownMobile);
    window.addEventListener('touchend', setMouseUpMobile);

    return () => {
      window.removeEventListener('touchmove', setFromEventMobile);
      window.removeEventListener('touchstart', setMouseDownMobile);
      window.removeEventListener('touchend', setMouseUpMobile);
    };
  }, [dragMobile]);

  return point;
};

export default useMousePoint;
