import { useState } from "react";

const useModifyNameModal = () => {
  const [modifyNameModal, setModifyNameModal] = useState(false);
  const handleModifyNameModalClose = () => setModifyNameModal(false);
  const handleModifyNameModalOpen = () => setModifyNameModal(true);

  return {
    modifyNameModal,
    handleModifyNameModalClose,
    handleModifyNameModalOpen,
  };
};

export default useModifyNameModal;
