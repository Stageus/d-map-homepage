import React from "react";

const useTrackingToolModal = () => {
  const [isTrackingToolModalOpen, setIsTrackingToolModalOpen] =
    React.useState(false);
  const toggleIsTrackingToolModalOpen = () => {
    setIsTrackingToolModalOpen(!isTrackingToolModalOpen);
  };

  return [isTrackingToolModalOpen, toggleIsTrackingToolModalOpen];
};

export default useTrackingToolModal;
