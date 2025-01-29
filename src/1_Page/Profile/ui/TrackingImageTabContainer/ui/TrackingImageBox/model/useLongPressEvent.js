import { useEffect, useRef, useState } from "react";

const useLongPressEvent = (onPinchStart, track) => {
  const timerRef = useRef(null);
  const [selectLongPressData, setSelectLongPressData] = useState(null);

  const handleStart = () => {
    timerRef.current = setTimeout(() => {
      if (onPinchStart) {
        onPinchStart();
        setSelectLongPressData(track);
      }
    }, 1000);
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

  return [
    selectLongPressData,
    {
      onTouchStart: handleStart,
      onTouchEnd: handleCancel,
      onTouchCancel: handleCancel,
    },
  ];
};

export default useLongPressEvent;
