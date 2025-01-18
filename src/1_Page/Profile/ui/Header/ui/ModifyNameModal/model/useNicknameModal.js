import { useState, useRef } from "react";
import putNickname from "../../../../../../../3_Entity/Account/putNickname";
import useConfirmModal from "../../../../../../../4_Shared/model/useModalHandler";

const useNicknameModal = (handleChangeNickName) => {
  const [confirmModal, handleConfirmModalOpen, handleConfirmModalClose] =
    useConfirmModal();
  const [message, setMessage] = useState("");

  const handleModifyNickname = async (nickname, handleClose) => {
    console.log(nickname);
    const result = await putNickname(nickname);
    if (result) {
      setMessage(`닉네임이 변경되었습니다 : ${nickname}`);
      handleChangeNickName(nickname);
      handleConfirmModalOpen();
      closeRef.current = handleClose;
      return;
    }
    setMessage(result);
    handleConfirmModalOpen();
  };

  const closeRef = useRef(null);
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
