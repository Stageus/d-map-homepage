import React from "react";

const useIsModifying = () => {
  const [isModifying, setIsModifying] = React.useState(false);

  const toggleIsModifying = () => {
    setIsModifying(!isModifying);
  };

  return [isModifying, toggleIsModifying];
};

export default useIsModifying;
