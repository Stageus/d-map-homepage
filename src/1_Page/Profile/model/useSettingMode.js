import { useMemo, useState } from "react";

const SETTING_MODE_LIST = ["공유", "삭제"];

const useSettingMode = () => {
  const [modifyMode, setIsModifyState] = useState(null);

  const handleSetMode = (type) => {
    if (SETTING_MODE_LIST.includes(type)) {
      setIsModifyState(type);
    }
  };

  const handleCloseMode = () => setIsModifyState(null);

  const memoizedSetMode = useMemo(
    () => ({
      modifyMode,
      handleSetMode,
      handleCloseMode,
    }),
    [modifyMode, handleSetMode, handleCloseMode]
  );

  return {
    modifyMode,
    memoizedSetMode,
  };
};

export default useSettingMode;
