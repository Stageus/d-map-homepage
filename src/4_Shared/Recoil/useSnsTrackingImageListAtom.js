import { atom } from "recoil";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
// key는 절대 겹치지 않게 설정
const snsTrackingImageListAtom = atom({
  key: "SNSTRACKINGIMAGELIST_ATOM",
  default: [],
});

const useSnsTrackingImageList = () => {
  const snsTrackingImageList = useRecoilValue(snsTrackingImageListAtom);
  const setSnsTrackingImageList = useSetRecoilState(snsTrackingImageListAtom);

  return [snsTrackingImageList, setSnsTrackingImageList];
};
export default useSnsTrackingImageList;
