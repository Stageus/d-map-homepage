import { useState, useRef } from "react";
import useModifyNickname from "../api/useModifyNickname";
import useConfirmModal from "../../../../../model/useConfirmModal";

const useNicknameModal = (nicknameRef) => {
  const { confirmModal, handleConfirmModalOpen, handleConfirmModalClose } =
    useConfirmModal();
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
  return {
    confirmModal,
    message,
    handleModifyNickname,
    handleNameConfirmModalDone,
  };
};

export default useNicknameModal;
