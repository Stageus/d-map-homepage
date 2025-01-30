import React, { useState } from "react";
import ReactDOM from "react-dom";
import { useForm } from "react-hook-form";
import STYLE from "./style";

import ConfirmModal from "../../../../../../../../2_Widget/ConfirmModal";

import useRandomNickname from "./model/useRandomNickname";
import useNicknameModal from "./model/useNicknameModal";
import usePutNickname from "../../../../../../../../3_Entity/Account/usePutNickname";
import useGetRandomNicknames from "../../../../../../../../3_Entity/Account/useGetRandomNicknames";

const ModifyNameModalContent = (props) => {
  const { name, handleClose, fetchUserInfo } = props;

  const [page, setPage] = useState(1);
  const [nicknames, loading] = useGetRandomNicknames(page);

  const { typeText, handleNextNickname } = useRandomNickname(
    nicknames,
    loading,
    setPage
  );

  const [
    confirmModal,
    message,
    showModalWithText,
    handleImageConfirmModalOpen,
    handleNameConfirmModalDone,
  ] = useNicknameModal();

  const handleSuccess = () => {
    fetchUserInfo();
    handleImageConfirmModalOpen(handleClose);
  };

  const [putNickname] = usePutNickname({
    onSuccess: handleSuccess,
    onError: showModalWithText,
  });

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
                setValueAs: (value) => value.trim(),
                pattern: {
                  value: /^[^\s][\s\S]{0,18}[^\s]$/,
                  message: "닉네임은 2글자 이상, 20자 이하로 입력해야 합니다!",
                },
                validate: (value) =>
                  value === name
                    ? "현재 닉네임과 동일합니다. 새로운 닉네임을 입력해 주세요!"
                    : true,
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
          onClick={handleSubmit((data) => {
            putNickname(data.nickname);
          })}>
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
