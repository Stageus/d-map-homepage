import { useState } from "react";

const useModifyClick = () => {
  const [isModifyClick, setIsmodifyClick] = useState(false);

  const handleModifyClickFalse = () => setIsmodifyClick(false);
  const handleModalModifyTrue = () => setIsmodifyClick(true);

  return {
    isModifyClick,
    handleModifyClickFalse,
    handleModalModifyTrue,
  };
};

export default useModifyClick;
