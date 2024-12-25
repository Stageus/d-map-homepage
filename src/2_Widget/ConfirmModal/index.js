import React from "react";
import STYLE from "./style";

const ConfirmModal = (props) => {
  const { message, onClose, onConfirm, onCancel, type } = props;
  return (
    <STYLE.ModalOverlay>
      <STYLE.ModalContent>
        <STYLE.ModalMessage>{message}</STYLE.ModalMessage>
        {type === "one" ? (
          <STYLE.ModalButton onClick={onClose}>확인</STYLE.ModalButton>
        ) : (
          <STYLE.ButtonWrapper>
            <STYLE.ModalButton className="confirm" onClick={onConfirm}>
              네
            </STYLE.ModalButton>
            <STYLE.ModalButton className="cancel" onClick={onCancel}>
              아니요
            </STYLE.ModalButton>
          </STYLE.ButtonWrapper>
        )}
      </STYLE.ModalContent>
    </STYLE.ModalOverlay>
  );
};

export default ConfirmModal;
