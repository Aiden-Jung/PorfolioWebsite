import { useState, useEffect } from 'react';

const useFocus = () => {
  const [focus, setFocus] = useState([true]);

  useEffect(() => {
    const whenFocus = () => {
      setFocus(true);
    };

    const whenBlur = () => {
      setFocus(false);
    };

    window.addEventListener('focus', whenFocus);
    window.addEventListener('blur', whenBlur);

    return () => {
      window.removeEventListener('focus', whenFocus);
      window.removeEventListener('blur', whenBlur);
    };
  }, []);

  return focus;
};

export default useFocus;
