import { useRef, useState } from "react";
import useConfirmModal from "../../../../../../../../../4_Shared/model/useModalHandler";

const useImageModal = () => {
  const [confirmModal, confirmModalToggle] = useConfirmModal();
  const closeRef = useRef(null);

  const [message, setMessage] = useState(null);

  const showModalWithText = (text) => {
    setMessage(text);
    confirmModalToggle();
  };

  const handleImageConfirmModalOpen = (handleClose) => {
    setMessage("변경 되었습니다.");
    closeRef.current = handleClose;
    confirmModalToggle();
  };

  const handleImageConfirmModalDone = () => {
    confirmModalToggle();
    closeRef.current?.();
  };

  return [
    confirmModal,
    message,
    showModalWithText,
    handleImageConfirmModalOpen,
    handleImageConfirmModalDone,
  ];
};

export default useImageModal;
