import React from "react";
import STYLE from "./style";

import Modal from "../../../../../../2_Widget/Modal";
import ConfirmModal from "../../../../../../2_Widget/ConfirmModal";

import useRandomNickname from "./model/useRandomNickname";
import useNicknameModal from "./model/useNicknameModal";

const ModifyNameModal = (props) => {
  const { name, onClose } = props;
  const { type, nicknameRef, handleType } = useRandomNickname();
  const {
    confirmModal,
    message,
    handleModifyNickname,
    handleNameConfirmModalDone,
  } = useNicknameModal(nicknameRef);

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
                handleModifyNickname(handleClose);
              }}>
              수정하기
            </STYLE.SubmitButton>
          </STYLE.Container>
        )}
      </Modal>
      {confirmModal && (
        <ConfirmModal
          type={"one"}
          message={message}
          onClose={handleNameConfirmModalDone}
        />
      )}
    </>
  );
};

export default ModifyNameModal;
