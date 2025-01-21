import { useState } from "react";

const useModalHandler = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const toggleModal = () => setIsModalOpen((prev) => !prev);
  return [isModalOpen, toggleModal];
};

export default useModalHandler;
