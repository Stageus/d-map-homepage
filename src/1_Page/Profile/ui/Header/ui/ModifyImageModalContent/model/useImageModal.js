import { useRef } from "react";
import useConfirmModal from "../../../../../../../4_Shared/model/useModalHandler";

const useImageModal = () => {
  const [confirmModal, confirmModalToggle] = useConfirmModal();
  const closeRef = useRef(null);

  const handleImageConfirmModalOpen = (handleClose) => {
    closeRef.current = handleClose;
    confirmModalToggle();
  };

  const handleImageConfirmModalDone = () => {
    confirmModalToggle();
    closeRef.current?.();
  };

  return [
    confirmModal,
    confirmModalToggle,
    handleImageConfirmModalOpen,
    handleImageConfirmModalDone,
  ];
};

export default useImageModal;
