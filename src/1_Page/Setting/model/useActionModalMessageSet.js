import { useState } from "react";
import ACTION_MESSAGES from "../constant/actionMessagesType";
import useModalHandler from "../../../4_Shared/model/useModalHandler";

const useActionModalMessageSet = () => {
  const [confirmTwoBtnModal, confimTwoBtnToggle] = useModalHandler();
  const [selectedActionMessage, setSelectedAction] = useState(null);

  const deleteModalOpen = () => {
    setSelectedAction(ACTION_MESSAGES.delete);
    confimTwoBtnToggle();
  };

  const logoutModalOpen = () => {
    setSelectedAction(ACTION_MESSAGES.logout);
    confimTwoBtnToggle();
  };

  return [
    confirmTwoBtnModal,
    selectedActionMessage,
    confimTwoBtnToggle,
    deleteModalOpen,
    logoutModalOpen,
  ];
};

export default useActionModalMessageSet;
