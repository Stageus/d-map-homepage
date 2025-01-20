import { useCallback, useState } from "react";
import useModalHandler from "../../../4_Shared/model/useModalHandler";
import { useNavigate } from "react-router-dom";

const useErrorModal = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [isModalOpen, toggleModal] = useModalHandler();
  const navigate = useNavigate();

  // 에러 메시지를 설정하고 모달을 표시하는 함수
  const showErrorModal = useCallback(
    (message) => {
      setErrorMessage(message);
      toggleModal();
    },
    [toggleModal]
  );

  const errorModalBackPage = () => {
    toggleModal();
    navigate(-1);
  };

  return {
    errorMessage,
    isModalOpen,
    showErrorModal,
    errorModalBackPage,
  };
};

export default useErrorModal;
