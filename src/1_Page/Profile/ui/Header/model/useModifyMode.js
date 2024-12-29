import { useState } from "react";

const useModifyMode = () => {
  // 모달 open close가 필요한 경우를 위해 명시적으로 함수명 설정
  const [modifyModeModal, setModifyModeModal] = useState(false);
  const handleModifyModeClose = () => setModifyModeModal(false);
  const handleModifyModeOpen = () => setModifyModeModal(true);

  return { modifyModeModal, handleModifyModeClose, handleModifyModeOpen };
};

export default useModifyMode;
