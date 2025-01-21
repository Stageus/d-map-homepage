import { atom } from "recoil";
import { useRecoilValue } from "recoil";
import { useSetRecoilState } from "recoil";
// key는 절대 겹치지 않게 설정
const todayHotPageAtom = atom({
  key: "SNSTODATHOTPAGE_ATOM",
  default: 1,
});

const useTodayHotPageAtom = () => {
  const todayHotPage = useRecoilValue(todayHotPageAtom);
  const setTodayHotPage = useSetRecoilState(todayHotPageAtom);

  return [todayHotPage, setTodayHotPage];
};
export default useTodayHotPageAtom;
