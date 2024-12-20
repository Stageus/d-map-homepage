import { useState, useEffect, useRef } from "react";

const useLongPressEvent = (onPinchStart, onPinchEnd, delay = 1000) => {
  const [isPinching, setIsPinching] = useState(false);
  const timerRef = useRef(null);

  const handleStart = () => {
    setIsPinching(true);
    timerRef.current = setTimeout(() => {
      if (onPinchStart) onPinchStart();
    }, delay);
  };

  const handleEnd = () => {
    setIsPinching(false);
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
