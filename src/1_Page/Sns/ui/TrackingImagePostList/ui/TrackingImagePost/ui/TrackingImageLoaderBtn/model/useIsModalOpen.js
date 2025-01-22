import React from "react";

const useIsModalOpen = () => {
  const [isModalOpen, setIsModalOpen] = React.useState(false);
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  return [isModalOpen, toggleModal];
};

export default useIsModalOpen;
