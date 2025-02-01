import TABS from "../constant/tabs";
import { useCookies } from "react-cookie";

const useThemeTab = () => {
  const [cookies, setCookie] = useCookies(["theme"]);

  // 쿠키에 저장된 테마를 읽고 기본값 설정 (WHITE)
  const currentTheme = cookies.theme || TABS.WHITE;

  const handleTabWhite = () =>
    setCookie("theme", TABS.WHITE, { path: "/", maxAge: 3600 });
  const handleTabDark = () =>
    setCookie("theme", TABS.DARK, { path: "/", maxAge: 3600 });
  const isPresentTab = (selectTab) => currentTheme === selectTab;

  return [handleTabWhite, handleTabDark, isPresentTab];
};

export default useThemeTab;
