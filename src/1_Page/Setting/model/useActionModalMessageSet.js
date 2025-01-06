import { useState, useEffect } from "react";
import ACTION_MESSAGES from "../constant/actionMessagesType";

const useActionModalMessageSet = () => {
  const [selectedAction, setSelectedAction] = useState(null);

  const handleMessageSetDelete = () => {
    setSelectedAction(ACTION_MESSAGES.delete);
  };

  const handleMessageSetLogout = () => {
    setSelectedAction(ACTION_MESSAGES.logout);
  };

  return {
    selectedAction,
    handleMessageSetDelete,
    handleMessageSetLogout,
  };
};

export default useActionModalMessageSet;
