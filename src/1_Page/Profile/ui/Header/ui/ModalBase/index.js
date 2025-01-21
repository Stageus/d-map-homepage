import React from "react";
import STYLE from "./style";
import useHandleModal from "./model/useHandleModal";

const ModalBase = (props) => {
  const { children, onClose, snap } = props;
  const {
    elementRef,
    isVisible,
    translateY,
    isDraggingRef,
    handleClose,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = useHandleModal(onClose, snap);

  return (
    <>
      <STYLE.Overlay onClick={handleClose} />
      <STYLE.Sheet
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        ref={elementRef}
        $isVisible={isVisible}
        $translateY={translateY}
        $isDragging={isDraggingRef.current}>
        <STYLE.Handle />
        {children && children({ handleClose })}
      </STYLE.Sheet>
    </>
  );
};

export default ModalBase;
