import React from "react";
const useThrottle = (callback, delay = 1000) => {
  let lastCallTime = React.useRef(Date.now());
  
  return () => {
    const timeElapsed = Date.now() - lastCallTime.current;
    if(timeElapsed >= delay) {
      callback();
      lastCallTime.current = Date.now();
    }
  }
};

export default useThrottle;
