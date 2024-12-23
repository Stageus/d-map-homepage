import { useState } from "react";

const useConfirmModalName = () => {
  const [confirmModal, setOneBtnModal] = useState(false);
  const handleSetConfirmModalOpen = () => setOneBtnModal(true);
  const handleSetConfirmModalClose = () => setOneBtnModal(false);
  return {
    confirmModal,
    handleSetConfirmModalOpen,
    handleSetConfirmModalClose,
  };
};

export default useConfirmModalName;
