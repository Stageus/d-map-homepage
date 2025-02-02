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

  // 모달이 닫힐 때 등록된 함수를 호출하고 모달 닫기
  const closeModal = () => {
    onCloseAction(); // 등록된 함수 실행
    setIsModalOpen(false); // 모달 닫기
  };

  const setAlert = (msg, action) => {
    setMessage(msg);
    if (typeof action === "function") {
      setOnCloseAction(() => action); // 사용자 정의 함수로 저장
    }
    setIsModalOpen(true); // 모달 열기
  };

  return [setAlert, isModalOpen, message, closeModal];
};

export default useAlertModalAtom;
