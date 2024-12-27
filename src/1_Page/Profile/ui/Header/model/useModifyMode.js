import { useState } from "react";

const useModifyMode = () => {
  const [modifyModeModal, setModifyModeModal] = useState(false);

  const handleModifyModeClose = () => setModifyModeModal(false);
  const handleModifyModeOpen = () => setModifyModeModal(true);

  return { modifyModeModal, handleModifyModeClose, handleModifyModeOpen };
};

export default useModifyMode;
