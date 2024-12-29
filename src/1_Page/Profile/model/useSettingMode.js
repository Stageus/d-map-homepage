import { useState } from "react";

const SETTING_MODE_LIST = ["공유", "수정"];

const useSettingMode = () => {
  const [modifyMode, setIsModifyState] = useState(null);

  const handleSetMode = (type) => {
    if (SETTING_MODE_LIST.includes(type)) {
      setIsModifyState(type);
    }
  };

  const handleCloseMode = () => setIsModifyState(null);

  return {
    modifyMode,
    handleSetMode,
    handleCloseMode,
  };
};

export default useSettingMode;
