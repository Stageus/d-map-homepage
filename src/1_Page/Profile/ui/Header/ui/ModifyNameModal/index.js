import React from "react";
import { useForm } from "react-hook-form";
import STYLE from "./style";

import Modal from "../Modal";
import ConfirmModal from "../../../../../../2_Widget/ConfirmModal";

import useRandomNickname from "./model/useRandomNickname";
import useNicknameModal from "./model/useNicknameModal";

const ModifyNameModal = (props) => {
  const { name, onClose } = props;
  const {
    confirmModal,
    message,
    handleModifyNickname,
    handleNameConfirmModalDone,
  } = useNicknameModal();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { nickname: name },
  });

  const { type, handleType } = useRandomNickname(setValue);

  return (
    <>
      <Modal onClose={onClose} snap={[0.2]}>
        {({ handleClose }) => (
          <STYLE.Container>
            <STYLE.Header>닉네임 변경</STYLE.Header>
            <STYLE.InputContainer>
              <STYLE.Label>닉네임</STYLE.Label>
              <STYLE.InputWrapper $error={errors.nickname}>
                <STYLE.CurrentNickname
                  placeholder="닉네임 입력"
                  {...register("nickname", {
                    required: "닉네임은 필수입니다!",
                    pattern: {
                      value: /^[^\s]{2,20}$/,
                      message:
                        "닉네임은 2글자 이상, 20자 이하로 입력해야 합니다!",
                    },
                  })}
                />
                <STYLE.SuggestedNickname
                  onClick={() => {
                    handleType(setValue);
                  }}>
                  딴거할래요
                </STYLE.SuggestedNickname>
              </STYLE.InputWrapper>
              {errors.nickname ? (
                <STYLE.ErrorText>{errors.nickname?.message}</STYLE.ErrorText>
              ) : (
                <STYLE.SuggestionText>
                  → {type} 닉네임이에요!
                </STYLE.SuggestionText>
              )}
            </STYLE.InputContainer>
            <STYLE.SubmitButton
              onClick={handleSubmit((data) =>
                handleModifyNickname(data.nickname, handleClose)
              )}>
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
