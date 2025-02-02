import { atom, useRecoilValue, useSetRecoilState } from "recoil";

// 모달 메시지 상태 (빈 문자열이면 닫힌 상태로 간주)
const modalMessageAtom = atom({
  key: "MODAL_MESSAGE_ATOM",
  default: null,
});

// 모달 닫기 동작 상태
const onCloseActionAtom = atom({
  key: "MODAL_CLOSE_ACTION_ATOM",
  default: () => {},
});

const useAlertModalAtom = () => {
  const modalMessage = useRecoilValue(modalMessageAtom);
  const setModalMessage = useSetRecoilState(modalMessageAtom);
  const setOnCloseAction = useSetRecoilState(onCloseActionAtom);
  const onCloseAction = useRecoilValue(onCloseActionAtom);

  const closeModal = () => {
    onCloseAction();
    setOnCloseAction(() => {});
    setModalMessage(null); // 모달을 닫을 때 메시지를 초기화
  };

  const setAlert = (msg, action) => {
    setModalMessage(msg);
    if (typeof action === "function") {
      setOnCloseAction(() => action);
    } else {
      setOnCloseAction(() => {});
    }
  };

  return [setAlert, modalMessage, closeModal];
};

export default useAlertModalAtom;
