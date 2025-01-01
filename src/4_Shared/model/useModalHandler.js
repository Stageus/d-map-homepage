import { useState } from "react";

const useModalHandler = () => {
  const [confirmModal, setConfirmModal] = useState(false);
  const handleConfirmModalOpen = () => setConfirmModal(true);
  const handleConfirmModalClose = () => setConfirmModal(false);
  return [confirmModal, handleConfirmModalOpen, handleConfirmModalClose];
};

export default useModalHandler;
