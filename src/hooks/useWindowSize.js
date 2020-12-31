import {useState, useEffect} from "react";

const useWindowSize = () => {
    const [windowSize, setSize] = useState([window.innerWidth, window.innerHeight]);
    
    const onResize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };

    
    useEffect(() => {
    
      window.addEventListener('resize', onResize);

      return () => {
        //window.removeEventListner('resize', onResize);
      }
    }, []);
    return windowSize;
}

export default useWindowSize;