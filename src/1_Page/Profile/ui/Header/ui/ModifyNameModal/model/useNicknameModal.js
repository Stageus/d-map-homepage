import { useState, useRef } from "react";
import putNickname from "../../../../../../../3_Entity/Account/putNickname";
import useConfirmModal from "../../../../../../../4_Shared/model/useModalHandler";

const useNicknameModal = (handleChangeNickName) => {
  const [confirmModal, confirmModalToggle] = useConfirmModal();
  const [message, setMessage] = useState("");

  const handleModifyNickname = async (nickname, handleClose) => {
    const result = await putNickname(nickname);
    if (result === true) {
      setMessage(`닉네임이 변경되었습니다 : ${nickname}`);
      handleChangeNickName(nickname);
      confirmModalToggle();
      closeRef.current = handleClose;
      return;
    }
    setMessage(result);
    confirmModalToggle();
  };

  const closeRef = useRef(null);
  const handleNameConfirmModalDone = () => {
    confirmModalToggle();
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
