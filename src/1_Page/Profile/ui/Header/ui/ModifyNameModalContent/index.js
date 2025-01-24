import React from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import STYLE from "./style";

import ConfirmModal from "../../../../../../2_Widget/ConfirmModal";

import useRandomNickname from "./model/useRandomNickname";
import useNicknameModal from "./model/useNicknameModal";

const ModifyNameModalContent = (props) => {
  const { name, handleClose, handleChangeNickName } = props;
  const {
    confirmModal,
    message,
    handleModifyNickname,
    handleNameConfirmModalDone,
  } = useNicknameModal(handleChangeNickName);

  const { typeText, handleNextNickname } = useRandomNickname();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: { nickname: name },
  });

  return (
    <>
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
                  message: "닉네임은 2글자 이상, 20자 이하로 입력해야 합니다!",
                },
                validate: (value) =>
                  value !== name ||
                  "현재 닉네임과 동일합니다. 새로운 닉네임을 입력해 주세요!",
              })}
            />
            <STYLE.SuggestedNickname
              onClick={() => {
                handleNextNickname(setValue);
              }}>
              딴거할래요
            </STYLE.SuggestedNickname>
          </STYLE.InputWrapper>
          {errors.nickname ? (
            <STYLE.ErrorText>{errors.nickname?.message}</STYLE.ErrorText>
          ) : (
            <STYLE.SuggestionText>
              → {typeText} 닉네임이에요!
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
      {confirmModal &&
        ReactDOM.createPortal(
          <ConfirmModal
            type={"one"}
            message={message}
            onClose={handleNameConfirmModalDone}
          />,
          document.body
        )}
    </>
  );
};

export default ModifyNameModalContent;
