import { useEffect, useRef, useState } from "react";

const useLongPressEvent = (onPinchStart, delay = 1000, track) => {
  const timerRef = useRef(null);
  const [selectLongPressData, setSelectLongPressData] = useState(null);

  const handleStart = () => {
    timerRef.current = setTimeout(() => {
      if (onPinchStart) {
        onPinchStart();
        setSelectLongPressData(track);
      }
    }, delay);
  };

  const handleCancel = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current); // 타이머 취소
      timerRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      clearTimeout(timerRef.current); // Cleanup 타이머
    };
  }, []);

  return {
    selectLongPressData,
    longPressEvents: {
      onTouchStart: handleStart,
      onTouchEnd: handleCancel,
      onTouchCancel: handleCancel,
    },
  };
};

export default useLongPressEvent;
