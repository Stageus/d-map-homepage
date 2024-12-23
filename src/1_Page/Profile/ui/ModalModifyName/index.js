import React, { useEffect, useState, useRef } from "react";
import STYLE from "./style";
import Modal from "../../../../2_Widget/Modal";
import ModalConfirm from "../../../../2_Widget/ModalConfirm";
import useConfirmModal from "../../model/useConfirmModal";

const ModalModifyName = (props) => {
  const { name } = props;
  const { onClose } = props;
  const [type, setType] = useState("현재");

  const {
    confirmModal,
    handleSetConfirmModalOpen,
    handleSetConfirmModalClose,
  } = useConfirmModal();

  const handleType = () => {
    setType("추천된");
  };

  const closeRef = useRef(null);

  const handleConfirmModalOpen = (handleClose) => {
    handleSetConfirmModalOpen();
    closeRef.current = handleClose;
  };
  const handleConfirmModalDone = () => {
    handleSetConfirmModalClose();
    closeRef.current();
  };

  return (
    <>
      <Modal onClose={onClose} snap={[0.2]}>
        {({ handleClose }) => (
          <STYLE.Container>
            <STYLE.Header>닉네임 변경</STYLE.Header>
            <STYLE.InputContainer>
              <STYLE.Label>닉네임</STYLE.Label>
              <STYLE.InputWrapper>
                <STYLE.CurrentNickname placeholder={name} />
                <STYLE.SuggestedNickname onClick={handleType}>
                  딴거할래요
                </STYLE.SuggestedNickname>
              </STYLE.InputWrapper>
              <STYLE.SuggestionText>
                → {type} 닉네임이에요!
              </STYLE.SuggestionText>
            </STYLE.InputContainer>
            <STYLE.SubmitButton
              onClick={() => {
                handleConfirmModalOpen(handleClose);
              }}>
              수정하기
            </STYLE.SubmitButton>
          </STYLE.Container>
        )}
      </Modal>
      {confirmModal && (
        <ModalConfirm
          type={"one"}
          message={"변경되었습니다"}
          onClose={handleConfirmModalDone}
        />
      )}
    </>
  );
};

export default ModalModifyName;
