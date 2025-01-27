import { useRef } from "react";
import useConfirmModal from "../../../../../../../4_Shared/model/useModalHandler";

const useNicknameModal = () => {
  const [confirmModal, confirmModalToggle] = useConfirmModal();

  const closeRef = useRef(null);

  const handleImageConfirmModalOpen = (handleClose) => {
    closeRef.current = handleClose;
    confirmModalToggle();
  };

  const handleNameConfirmModalDone = () => {
    confirmModalToggle();
    if (closeRef.current) closeRef.current();
  };

  return [
    confirmModal,
    confirmModalToggle,
    handleImageConfirmModalOpen,
    handleNameConfirmModalDone,
  ];
};

export default useNicknameModal;
