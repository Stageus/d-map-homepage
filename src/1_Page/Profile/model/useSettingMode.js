import { useState } from "react";

const SettingMode = Object.freeze({
  SHARE: "공유",
  EDIT: "수정",
});

const useSettingMode = () => {
  const [modifyMode, setIsModifyState] = useState(null);

  const handleSetMode = (type) => {
    if (Object.values(SettingMode).includes(type)) {
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
