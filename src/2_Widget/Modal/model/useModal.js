import { useState, useRef, useEffect } from "react";
import makeSnapPoints from "../lib/makeSnapPoints";

const useModal = (onClose, snap = [0]) => {
  const [isVisible, setIsVisible] = useState(false); // 열림 상태
  const [translateY, setTranslateY] = useState(0); // 바텀시트 위치
  const startY = useRef(0); // 시작 Y좌표
  const currentY = useRef(0); // 현재 Y좌표
  const isDragging = useRef(false); // 드래그 상태
  const elementRef = useRef(null);

  const snapPoints = makeSnapPoints(elementRef, snap);

  useEffect(() => {
    setIsVisible(true); // Open 애니메이션 실행
  }, []);

  const handleTouchStart = (e) => {
    if (!isVisible) return;
    isDragging.current = true;
    startY.current = e.touches[0].clientY;
    currentY.current = translateY;
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current || !isVisible) return;
    const deltaY = e.touches[0].clientY - startY.current;
    setTranslateY(currentY.current + deltaY);
  };

  const handleTouchEnd = () => {
    if (!isVisible) return;
    isDragging.current = false;
    finalizePosition();
  };

  const finalizePosition = () => {
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

  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => {
      if (onClose) onClose();
    }, 300);
  };

  return {
    isVisible,
    translateY,
    isDragging,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleClose,
    elementRef,
  };
};

export default useModal;
