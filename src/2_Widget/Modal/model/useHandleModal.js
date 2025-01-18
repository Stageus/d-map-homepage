import React from "react";
import makeSnapPoints from "../lib/makeSnapPoints";

const useHandleModal = (onClose, sheetRef) => {
  const [isVisible, setIsVisible] = React.useState(false); // 열림 상태
  const [translateY, setTranslateY] = React.useState(0); // 바텀시트 위치

  const startYRef = React.useRef(0); // 시작 Y좌표
  const currentYRef = React.useRef(0); // 현재 Y좌표
  const isDraggingRef = React.useRef(false); // 드래그 상태
  const snapRef = React.useRef([0]);
  const snapPoints = makeSnapPoints(sheetRef, snapRef.current);

  React.useEffect(() => {
    setIsVisible(true); // Open 애니메이션 실행
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };
  const handleTouchStart = (e) => {
    if (!isVisible) return;
    isDraggingRef.current = true;
    startYRef.current = e.touches[0].clientY;
    currentYRef.current = translateY;
  };
  const handleTouchMove = (e) => {
    if (!isDraggingRef.current || !isVisible) return;
    const deltaY = e.touches[0].clientY - startYRef.current;
    setTranslateY(currentYRef.current + deltaY);
  };
  const handleTouchEnd = () => {
    if (!isVisible) return;
    isDraggingRef.current = false;
    if (translateY > 20) {
      handleClose();
      return;
    }

    const closestSnapPoint = snapPoints.reduce((closest, current) => {
      return Math.abs(current - translateY) < Math.abs(closest - translateY)
        ? current
        : closest;
    });
    setTranslateY(closestSnapPoint);
  };

  return {
    isVisible,
    translateY,
    isDraggingRef,
    handleClose,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd
  };
};

export default useHandleModal;
