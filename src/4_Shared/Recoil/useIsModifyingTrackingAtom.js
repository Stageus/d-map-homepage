import { atom } from "recoil";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
// key는 절대 겹치지 않게 설정
const isModifyingTrackingAtom = atom({ key: "ISMODIFYINGTRACKING_ATOM", default: false });

const useIsModifyingTrackingAtom = () => {
  const isModifyingTracking = useRecoilValue(isModifyingTrackingAtom);
  const setIsModifyingTracking = useSetRecoilState(isModifyingTrackingAtom);

  const toggleIsTracking = () => {
    setIsModifyingTracking(!isModifyingTracking);
  };

  return [isModifyingTracking, toggleIsTracking];
};
export default useIsModifyingTrackingAtom;
