import { useState } from "react";

const useModals = () => {
  const [isModifyClick, setIsmodifyClick] = useState(false);
  const [modifyMapModal, setModifyMapModal] = useState(false);
  const [modifyNameModal, setModifyNameModal] = useState(false);

  const handleModifyClickFalse = () => setIsmodifyClick(false);
  const handleModalModifyTrue = () => setIsmodifyClick(true);

  const handleModifyMapClose = () => setModifyMapModal(false);
  const handleModifyMapOpen = () => setModifyMapModal(true);

  const handleModifyNameModalClose = () => setModifyNameModal(false);
  const handleModifyNameModalOpen = () => setModifyNameModal(true);

  return {
    isModifyClick,
    modifyMapModal,
    modifyNameModal,
    handleModalModifyTrue,
    handleModifyClickFalse,
    handleModifyMapClose,
    handleModifyMapOpen,
    handleModifyNameModalClose,
    handleModifyNameModalOpen,
  };
};

export default useModals;
