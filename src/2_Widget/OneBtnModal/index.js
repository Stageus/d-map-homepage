import React from "react";
import STYLE from "./style";

const Modal = ({ message, onClose }) => {
  return (
    <STYLE.ModalOverlay>
      <STYLE.ModalContent>
        <STYLE.ModalMessage>{message}</STYLE.ModalMessage>
        <STYLE.ModalButton onClick={onClose}>확인</STYLE.ModalButton>
      </STYLE.ModalContent>
    </STYLE.ModalOverlay>
  );
};

export default Modal;
