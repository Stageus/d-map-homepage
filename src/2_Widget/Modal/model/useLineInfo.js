import React from "react";

const useLineInfo = () => {
  const [lineInfo, setLineInfo] = React.useState({
    lineWeight: 2,
    lineColor: "#FF0000",
  });
  const handleLineInfo = (newLineInfo) => {
    setLineInfo((prev) => ({ ...prev, ...newLineInfo }));
  };

  return [lineInfo, handleLineInfo];
};

export default useLineInfo;
