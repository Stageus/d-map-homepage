import React, { useState, useEffect, useRef } from "react";
import STYLE from "./style";

const BottomSheet = ({ children, onClose }) => {
  const [isVisible, setIsVisible] = useState(false); // 열림 상태
  const [translateY, setTranslateY] = useState(0); // 바텀시트 위치
  const startY = useRef(0); // 터치 시작 Y좌표
  const currentY = useRef(0); // 현재 Y좌표
  const isDragging = useRef(false); // 드래그 상태

  useEffect(() => {
    setIsVisible(true); // Open 애니메이션 실행
  }, []);

  const handleTouchStart = (e) => {
    if (!isVisible) return; // 닫힘 상태에서는 드래그 불가
    isDragging.current = true; // 드래그 시작
    startY.current = e.touches[0].clientY; // 터치 시작 Y좌표 기록
    currentY.current = translateY; // 현재 위치 기록
  };

  const handleTouchMove = (e) => {
    if (!isDragging.current || !isVisible) return;
    const deltaY = e.touches[0].clientY - startY.current; // 이동 거리 계산
    setTranslateY(deltaY); // 위치 업데이트
  };

  useEffect(() => {
    console.log(translateY);
  }, [translateY]);

  const handleTouchEnd = () => {
    if (!isVisible) return; // 닫힘 상태에서는 드래그 불가
    isDragging.current = false; // 드래그 종료
    if (translateY > 200) {
      handleClose(); // 200px 이상이면 닫기
    } else {
      setTranslateY(0); // 원래 위치로 복귀
    }
  };

  const handleClose = () => {
    setIsVisible(false); // 닫기 애니메이션 실행
    setTranslateY(300); // 바텀시트가 아래로 내려가는 위치 설정
    setTimeout(() => {
      if (onClose) onClose();
    }, 300); // 닫힘 애니메이션 시간 설정
  };

  return (
    <STYLE.Overlay>
      <STYLE.Sheet
        className={isVisible ? "open" : "close"}
        style={{
          transform: `translateY(${isVisible ? translateY : "300"}px)`,
          transition: isVisible ? "" : "transform 0.3s ease-out",
        }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}>
        <STYLE.Handle />
        {children({ handleClose })}
      </STYLE.Sheet>
    </STYLE.Overlay>
  );
};

export default BottomSheet;
