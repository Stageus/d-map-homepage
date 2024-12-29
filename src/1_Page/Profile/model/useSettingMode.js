import { useState } from "react";

const useSettingMode = () => {
  const [modifyMode, setIsModifyState] = useState(null);
  const handleSetMode = (type) => setIsModifyState(type);
  const handleCloseMode = () => setIsModifyState(null);
  return {
    modifyMode,
    handleSetMode,
    handleCloseMode,
  };
};
export default useSettingMode;
