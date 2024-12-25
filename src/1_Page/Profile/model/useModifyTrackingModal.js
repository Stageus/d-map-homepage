import { useState } from "react";

const useModifyTrackingModal = () => {
  const [modifyTrackingModal, setModifyTrackingModal] = useState(false);

  const handleModifyTrackingClose = () => setModifyTrackingModal(false);
  const handleModifyTrackingOpen = () => setModifyTrackingModal(true);

  return {
    modifyTrackingModal,
    handleModifyTrackingClose,
    handleModifyTrackingOpen,
  };
};

export default useModifyTrackingModal;
