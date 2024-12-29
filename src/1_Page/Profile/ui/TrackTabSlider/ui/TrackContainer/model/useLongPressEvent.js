import { useEffect, useRef } from "react";

const useLongPressEvent = (onPinchStart, delay = 1000) => {
  const timerRef = useRef(null);

  const handleStart = () => {
    timerRef.current = setTimeout(() => {
      if (onPinchStart) onPinchStart();
    }, delay);
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current); // Cleanup 타이머
    };
  }, []);

  return {
    onMouseDown: handleStart,
    onTouchStart: handleStart,
  };
};

export default useLongPressEvent;
