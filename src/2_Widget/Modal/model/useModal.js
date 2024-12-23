import { useState, useRef, useEffect } from "react";

const useBottomSheet = (onClose, snap = [0.3]) => {
  const [isVisible, setIsVisible] = useState(false); // 열림 상태
  const [translateY, setTranslateY] = useState(0); // 바텀시트 위치
  const startY = useRef(0); // 시작 Y좌표
  const currentY = useRef(0); // 현재 Y좌표
  const isDragging = useRef(false); // 드래그 상태

  const screenHeight = window.innerHeight; // 화면 높이
  const snapPoints = [0]; // 스냅 포인트 (비율 기반)
  snap.forEach((item) => {
    snapPoints.push(-screenHeight * item);
  });

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

  const handleMouseDown = (e) => {
    if (!isVisible) return;
    isDragging.current = true;
    startY.current = e.clientY;
    currentY.current = translateY;
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current || !isVisible) return;
    const deltaY = e.clientY - startY.current;
    setTranslateY(currentY.current + deltaY);
  };

  const handleMouseUp = (e) => {
    if (!isVisible) return;
    isDragging.current = false;
    finalizePosition();
  };

  const finalizePosition = () => {
    if (translateY > 20) {
      handleClose();
      return;
    }

    const closestSnapPoint = snapPoints.reduce((prev, curr) => {
      return Math.abs(curr - translateY) < Math.abs(prev - translateY)
        ? curr
        : prev;
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
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    handleClose,
  };
};

export default useBottomSheet;
