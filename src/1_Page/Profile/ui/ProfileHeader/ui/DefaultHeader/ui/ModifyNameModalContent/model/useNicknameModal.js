import { useRef, useState } from "react";
import useConfirmModal from "../../../../../../../../../4_Shared/model/useModalHandler";

const useNicknameModal = () => {
  const [confirmModal, confirmModalToggle] = useConfirmModal();
  const [message, setMessage] = useState("");

  const closeRef = useRef(null);

  const handleImageConfirmModalOpen = (handleClose) => {
    closeRef.current = handleClose;
    setMessage("변경되었습니다.");
    confirmModalToggle();
  };

  const handleNameConfirmModalDone = () => {
    confirmModalToggle();
    if (closeRef.current) closeRef.current();
  };

  const showModalWithText = (text) => {
    setMessage(text);
    confirmModalToggle();
  };

  return [
    confirmModal,
    message,
    showModalWithText,
    handleImageConfirmModalOpen,
    handleNameConfirmModalDone,
  ];
};

export default useNicknameModal;
