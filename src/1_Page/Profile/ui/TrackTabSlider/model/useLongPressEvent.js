import { useEffect, useRef } from "react";

const useLongPressEvent = (onPinchStart, onPinchEnd, delay = 1000) => {
  const timerRef = useRef(null);

  const handleStart = () => {
    timerRef.current = setTimeout(() => {
      if (onPinchStart) onPinchStart();
    }, delay);
  };

  const handleEnd = () => {
    clearTimeout(timerRef.current);
    if (onPinchEnd) onPinchEnd();
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current); // Cleanup 타이머
    };
  }, []);

  return {
    onMouseDown: handleStart,
    onMouseUp: handleEnd,
    onMouseLeave: handleEnd,
    onTouchStart: handleStart,
    onTouchEnd: handleEnd,
  };
};

export default useLongPressEvent;
