import React, { useState, useRef } from "react";
import STYLE from "./style";

import Modal from "../../../../../../2_Widget/Modal";
import ConfirmModal from "../../../../../../2_Widget/ConfirmModal";

import useConfirmModal from "../../../../model/useConfirmModal";

import data from "./data";

const ModifyNameModal = (props) => {
  const { name, onClose } = props;
  const [type, setType] = useState("현재");

  const nicknameRef = useRef(null);
  const randNickName = data?.message.nickname;
  const [randState, setRandState] = useState(0);

  const {
    confirmModal,
    handleSetConfirmModalOpen,
    handleSetConfirmModalClose,
  } = useConfirmModal();

  const handleType = () => {
    nicknameRef.current.value = randNickName[randState];
    setType("추천된");
    setRandState((prev) => prev + 1);
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
                handleConfirmModalOpen(handleClose);
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
          onClose={handleConfirmModalDone}
        />
      )}
    </>
  );
};

export default ModifyNameModal;
