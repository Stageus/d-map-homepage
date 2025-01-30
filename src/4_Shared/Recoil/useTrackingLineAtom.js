import { atom } from "recoil";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
// key는 절대 겹치지 않게 설정
const trackingLineAtom = atom({ key: "TRACKINGLINE_ATOM", default: JSON.parse(localStorage.getItem("trackingLine")) || [] });

const useTrackingLineAtom = () => {
  const trackingLine = useRecoilValue(trackingLineAtom);
  const setTrackingLine = useSetRecoilState(trackingLineAtom);

  const setTrackingLineEvent = (value) => {
    setTrackingLine(value);
  };

  return [trackingLine, setTrackingLineEvent];
};
export default useTrackingLineAtom;
