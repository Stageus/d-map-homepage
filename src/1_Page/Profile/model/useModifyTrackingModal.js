import { useState } from "react";

const useModifyTrackingModal = () => {
  const [modifyMapModal, setModifyMapModal] = useState(false);

  const handleModifyMapClose = () => setModifyMapModal(false);
  const handleModifyMapOpen = () => setModifyMapModal(true);

  return {
    modifyMapModal,
    handleModifyMapClose,
    handleModifyMapOpen,
  };
};

export default useModifyTrackingModal;
