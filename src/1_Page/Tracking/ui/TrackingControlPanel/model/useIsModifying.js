import React from "react";

const useIsModfying = () => {
  const [isModifying, setIsModifying] = React.useState(false);

  const toggleIsModifying = () => {
    setIsModifying(!isModifying);
  };

  return [isModifying, toggleIsModifying];
};

export default useIsModfying;
