import React, { useRef } from "react";
import STYLE from "./style";

import Modal from "../../../../../../2_Widget/Modal";
import ConfirmModal from "../../../../../../2_Widget/ConfirmModal";

import useConfirmModal from "../../../../model/useConfirmModal";
import useRandomNickname from "./model/useRandomNickname";

const ModifyNameModal = (props) => {
  const { name, onClose } = props;
  const { confirmModal, handleConfirmModalOpen, handleConfirmModalClose } =
    useConfirmModal();
  const { type, nicknameRef, handleType } = useRandomNickname();

  const closeRef = useRef(null);
  const handleNameConfirmModalOpen = (handleClose) => {
    handleConfirmModalOpen();
    closeRef.current = handleClose;
  };
  const handleNameConfirmModalDone = () => {
    handleConfirmModalClose();
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
                <STYLE.CurrentNickname placeholder={name} ref={nicknameRef} />
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
                handleNameConfirmModalOpen(handleClose);
              }}>
              수정하기
            </STYLE.SubmitButton>
          </STYLE.Container>
        )}
      </Modal>
      {confirmModal && (
        <ConfirmModal
          type={"one"}
          message={"변경되었습니다"}
          onClose={handleNameConfirmModalDone}
        />
      )}
    </>
  );
};

export default ModifyNameModal;
