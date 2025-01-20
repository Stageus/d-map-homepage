import { useState, useRef } from "react";
import useConfirmModal from "../../../../../../../4_Shared/model/useModalHandler";

const useImageModal = () => {
  const [confirmModal, confirmModalToggle] = useConfirmModal();
  const [message, setMessage] = useState("");
  const closeRef = useRef(null);

  const handleImageConfirmModalOpen = (handleClose) => {
    closeRef.current = handleClose;
    confirmModalToggle();
  };

  const handleImageConfirmModalDone = () => {
    confirmModalToggle();
    closeRef.current?.();
  };

  return {
    message,
    setMessage,
    confirmModal,
    confirmModalToggle,
    handleImageConfirmModalOpen,
    handleImageConfirmModalDone,
  };
};

export default useImageModal;
