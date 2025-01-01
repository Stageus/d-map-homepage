import { useState } from "react";

const useModifyTrackingModal = () => {
  // 모달 open close가 필요한 경우를 위해 명시적으로 함수명 설정
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
