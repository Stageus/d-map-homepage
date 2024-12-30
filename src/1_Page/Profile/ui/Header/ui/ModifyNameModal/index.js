import React, { useRef, useState } from "react";
import STYLE from "./style";

import Modal from "../../../../../../2_Widget/Modal";
import ConfirmModal from "../../../../../../2_Widget/ConfirmModal";

import useConfirmModal from "../../../../model/useConfirmModal";
import useRandomNickname from "./model/useRandomNickname";
import useModifyNickname from "./api/useModifyNickname";

const ModifyNameModal = (props) => {
  const { name, onClose } = props;
  const { confirmModal, handleConfirmModalOpen, handleConfirmModalClose } =
    useConfirmModal();
  const { type, nicknameRef, handleType } = useRandomNickname();

  const [message, setMessage] = useState("");
  const { modify, loading, error } = useModifyNickname();

  const handleModifyNickname = (handleClose) => {
    const nickname = nicknameRef.current.value;
    const nicknameRegex = /^[^\s]{2,20}$/;
    if (!nickname) {
      setMessage("닉네임은 필수입니다.");
      handleConfirmModalOpen();
      return;
    }
    if (!nicknameRegex.test(nickname)) {
      setMessage("닉네임은 2글자 이상, 20자 이하로 입력해야 합니다.");
      return;
    }
    const result = modify(nickname);

    if (result) {
      setMessage(`닉네임이 변경되었습니다 :  ${nickname}`);
      handleNameConfirmModalOpen(handleClose);
      return;
    }
    setMessage(result);
    handleConfirmModalOpen();
  };

  const closeRef = useRef(null);
  const handleNameConfirmModalOpen = (handleClose) => {
    handleConfirmModalOpen();
    closeRef.current = handleClose;
  };
  const handleNameConfirmModalDone = () => {
    handleConfirmModalClose();
    if (closeRef.current) closeRef.current();
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
