import { atom } from "recoil";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
// key는 절대 겹치지 않게 설정
const snsRecentPageAtom = atom({
  key: "SNSRECENTPAGE_ATOM",
  default: 1,
});

const useSnsRecentPageAtom = () => {
  const snsRecentPage = useRecoilValue(snsRecentPageAtom);
  const setSnsRecentPage = useSetRecoilState(snsRecentPageAtom);

  return [snsRecentPage, setSnsRecentPage];
};
export default useSnsRecentPageAtom;
