import React, { useEffect } from "react";
import STYLE from "./style";
import useHandleModal from "./model/useHandleModal";

const Modal = (props) => {
  const { children, onClose, snap } = props;
  const { elementRef, isVisible, translateY, isDraggingRef, handleClose } =
    useHandleModal(onClose, snap);

  return (
    <>
      <STYLE.Overlay onClick={handleClose} />
      <STYLE.Sheet
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

export default Modal;
