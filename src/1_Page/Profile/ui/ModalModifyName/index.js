import React, { useEffect, useState } from "react";
import STYLE from "./style";
import Modal from "../../../../2_Widget/Modal";

const ModalModifyName = (props) => {
  const { name } = props;
  const { onClose } = props;
  const [type, setType] = useState("현재");

  const handleType = () => {
    setType("추천된");
  };

  return (
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
            <STYLE.SuggestionText>→ {type} 닉네임이에요!</STYLE.SuggestionText>
          </STYLE.InputContainer>
          <STYLE.SubmitButton onClick={handleClose}>
            수정하기
          </STYLE.SubmitButton>
        </STYLE.Container>
      )}
    </Modal>
  );
};

export default ModalModifyName;
