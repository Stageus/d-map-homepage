import { atom } from "recoil";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
// key는 절대 겹치지 않게 설정
const snsDefaultPageAtom = atom({
  key: "SNSDEFAULTPAGE_ATOM",
  default: 1,
});

const useSnsDefaultPageAtom = () => {
  const snsDefaultPage = useRecoilValue(snsDefaultPageAtom);
  const setSnsDefaultPage = useSetRecoilState(snsDefaultPageAtom);

  return [snsDefaultPage, setSnsDefaultPage];
};
export default useSnsDefaultPageAtom;
