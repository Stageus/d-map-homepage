import { atom } from "recoil";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
// key는 절대 겹치지 않게 설정
const isTrackingAtom = atom({ key: "ISTRACKING_ATOM", default: false });

const useIsTrackingAtom = () => {
  const isTracking = useRecoilValue(isTrackingAtom);
  const setIsTracking = useSetRecoilState(isTrackingAtom);

  const toggleIsTracking = () => {
    setIsTracking(!isTracking);
  };

  return [isTracking, toggleIsTracking];
};
export default useIsTrackingAtom;
