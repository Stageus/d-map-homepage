import React from "react";
import STYLE from "./style";

const ModalTwoBtn = ({ message, onConfirm, onCancel }) => {
  return (
    <STYLE.ModalOverlay>
      <STYLE.ModalContent>
        <STYLE.ModalMessage>{message}</STYLE.ModalMessage>
        <STYLE.ButtonWrapper>
          <STYLE.ModalButton className="confirm" onClick={onConfirm}>
            네
          </STYLE.ModalButton>
          <STYLE.ModalButton className="cancel" onClick={onCancel}>
            아니요
          </STYLE.ModalButton>
        </STYLE.ButtonWrapper>
      </STYLE.ModalContent>
    </STYLE.ModalOverlay>
  );
};

export default ModalTwoBtn;
