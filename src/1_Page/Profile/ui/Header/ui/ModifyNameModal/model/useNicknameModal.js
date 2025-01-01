import { useState, useRef } from "react";
import useModifyNickname from "../../../../../../../3_Entity/Profile/useModifyNickname";
import useConfirmModal from "../../../../../../../2_Widget/ConfirmModal/model/useConfirmModal";

const useNicknameModal = () => {
  const { confirmModal, handleConfirmModalOpen, handleConfirmModalClose } =
    useConfirmModal();
  const [message, setMessage] = useState("");
  const { modify, loading, error } = useModifyNickname();

  const handleModifyNickname = (nickname, handleClose) => {
    const result = modify(nickname);
    if (result) {
      setMessage(`닉네임이 변경되었습니다 : ${nickname}`);
      handleNameConfirmModalOpen(handleClose);
      return;
    }
    setMessage(result);
    handleConfirmModalOpen();
  };

  const closeRef = useRef(null);
  const handleNameConfirmModalOpen = (handleClose) => {
    handleConfirmModalOpen();
    closeRef.current = handleClose;
  };
  const handleNameConfirmModalDone = () => {
    handleConfirmModalClose();
    if (closeRef.current) closeRef.current();
  };

  return {
    confirmModal,
    message,
    handleModifyNickname,
    handleNameConfirmModalDone,
  };
};

export default useNicknameModal;
