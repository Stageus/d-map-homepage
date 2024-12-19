import React, { useEffect } from "react";
import STYLE from "./style";
import useBottomSheet from "./model/useBottomSheet";

const BottomSheet = ({ children, onClose, snap }) => {
  const {
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
  } = useBottomSheet(onClose, snap);

  return (
    <STYLE.Overlay
      onClick={handleClose}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}>
      <STYLE.EventPropagation
        onClick={(e) => {
          e.stopPropagation();
        }}>
        <STYLE.Sheet
          className={isVisible ? "open" : "close"}
          style={{
            transform: `translateY(${isVisible ? translateY : "300"}px)`,
            transition: !isDragging.current
              ? "transform 0.3s ease-out"
              : "none",
          }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseDown={handleMouseDown}>
          <STYLE.Handle />
          {children({ handleClose })}
        </STYLE.Sheet>
      </STYLE.EventPropagation>
    </STYLE.Overlay>
  );
};

export default BottomSheet;
