import { useState } from "react";

const useSettingMode = () => {
  const [modifyMode, setIsModifyState] = useState(false);
  const handleSetMode = (type) => setIsModifyState(type);
  const handleCloseMode = () => setIsModifyState(false);
  return {
    modifyMode,
    handleSetMode,
    handleCloseMode,
  };
};
export default useSettingMode;
