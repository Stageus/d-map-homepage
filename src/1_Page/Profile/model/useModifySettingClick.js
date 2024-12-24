import { useState } from "react";

const useModifySettingClick = () => {
  const [isModifyClick, setIsmodifyClick] = useState(false);

  const handleModifyClickFalse = () => setIsmodifyClick(false);
  const handleModalModifyTrue = () => setIsmodifyClick(true);

  return {
    isModifyClick,
    handleModifyClickFalse,
    handleModalModifyTrue,
  };
};

export default useModifySettingClick;
