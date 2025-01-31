import { useState } from "react";
import useModalHandler from "../../../4_Shared/model/useModalHandler";

const useErrorModalHandler = () => {
  const [errorModal, errorModalToggle] = useModalHandler();
  const [errorMessage, setErrorMessage] = useState("");
  const errorModalOpen = (message) => {
    setErrorMessage(message);
    errorModalToggle();
  };
  return [errorModal, errorMessage, errorModalOpen, errorModalToggle];
};

export default useErrorModalHandler;
