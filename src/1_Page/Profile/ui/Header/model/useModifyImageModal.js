import { useState } from "react";

const useModifyImageModal = () => {
  const [modifyImageModal, setModifyImageModal] = useState(false);
  const handleImageModalOpen = () => setModifyImageModal(true);
  const handleImageModalClose = () => setModifyImageModal(false);
  return { modifyImageModal, handleImageModalClose, handleImageModalOpen };
};

export default useModifyImageModal;
