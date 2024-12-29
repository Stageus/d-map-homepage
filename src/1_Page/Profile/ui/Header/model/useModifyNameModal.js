import { useState } from "react";

const useModifyNameModal = () => {
  // 모달 open close가 필요한 경우를 위해 명시적으로 함수명 설정
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
