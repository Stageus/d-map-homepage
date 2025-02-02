import { atom, useRecoilValue, useSetRecoilState } from "recoil";
import { useState } from "react";

// 모달 상태를 관리하는 atom (true/false로 모달 열림 여부 관리)
const isModalOpenAtom = atom({
  key: "MODAL_OPEN_STATE_ATOM",
  default: false,
});

const useAlertModalAtom = () => {
  const isModalOpen = useRecoilValue(isModalOpenAtom);
  const setIsModalOpen = useSetRecoilState(isModalOpenAtom);
  const [message, setMessage] = useState("");
  const [onCloseAction, setOnCloseAction] = useState(() => () => {});

  const closeModal = () => {
    onCloseAction();
    setIsModalOpen(false);
  };

  const setAlert = (msg, action) => {
    setMessage(msg);
    if (typeof action === "function") {
      setOnCloseAction(() => action);
    }
    setIsModalOpen(true);
  };

  return [setAlert, isModalOpen, message, closeModal];
};

export default useAlertModalAtom;
