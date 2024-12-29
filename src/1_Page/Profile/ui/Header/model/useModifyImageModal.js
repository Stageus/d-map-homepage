import { useState } from "react";

const useModifyImageModal = () => {
  // 모달 open close가 필요한 경우를 위해 명시적으로 함수명 설정
  const [modifyImageModal, setModifyImageModal] = useState(false);
  const handleImageModalOpen = () => setModifyImageModal(true);
  const handleImageModalClose = () => setModifyImageModal(false);
  return { modifyImageModal, handleImageModalClose, handleImageModalOpen };
};

export default useModifyImageModal;
