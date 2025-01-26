import { useState, useRef } from "react";
import useConfirmModal from "../../../../../../../4_Shared/model/useModalHandler";

const useNicknameModal = (putNickname, handleChangeNickName) => {
  const [confirmModal, confirmModalToggle] = useConfirmModal();
  const [message, setMessage] = useState("");

  const handleModifyNickname = async (nickname, handleClose) => {
    await putNickname(nickname);
    setMessage(`닉네임이 변경되었습니다 : ${nickname}`);
    handleChangeNickName(nickname);
    confirmModalToggle();
    closeRef.current = handleClose;
  };

  const closeRef = useRef(null);
  const handleNameConfirmModalDone = () => {
    confirmModalToggle();
    if (closeRef.current) closeRef.current();
  };

  return [
    confirmModal,
    message,
    handleModifyNickname,
    handleNameConfirmModalDone,
  ];
};

export default useNicknameModal;
