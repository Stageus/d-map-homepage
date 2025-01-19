import React, { useEffect } from "react";

const useHandleModal = (onClose, snap = [0]) => {
  const [isVisible, setIsVisible] = React.useState(false); // 열림 상태
  const [translateY, setTranslateY] = React.useState(0); // 바텀시트 위치
  const [snapPoints, setSnapPoints] = React.useState([]);

  const startYRef = React.useRef(0); // 시작 Y좌표
  const currentYRef = React.useRef(0); // 현재 Y좌표
  const isDraggingRef = React.useRef(false); // 드래그 상태
  const elementRef = React.useRef(null);

  React.useEffect(() => {
    setIsVisible(true); // Open 애니메이션 실행
    const makeSnapPoints = (elementRef, snap) => {
      const snapPoints = [0];
      const screenHeight = window.innerHeight;

      snap.forEach((item) => {
        snapPoints.push(-screenHeight * item);
      });

      // 요소 높이를 기반으로 스냅 포인트 설정
      if (elementRef.current) {
        const elementHeight = elementRef.current.offsetHeight;

        // 최대 translateY 계산
        const maxTranslateY = -(screenHeight - elementHeight);
        snap.forEach((item) => {
          snapPoints.push(-screenHeight * item);
        });

        if (!snapPoints.includes(maxTranslateY)) {
          snapPoints.push(maxTranslateY + 5);
        }

        snapPoints.sort((a, b) => a - b);
      }
      return snapPoints;
    };
    const snapPoints = makeSnapPoints(elementRef, snap);
    snapPoints.sort((a, b) => a - b);
    setSnapPoints(snapPoints);
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
    elementRef,
    isVisible,
    translateY,
    isDraggingRef,
    handleClose,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  };
};
export default useHandleModal;
