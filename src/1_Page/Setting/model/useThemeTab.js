import { useEffect, useState } from "react";
import TABS from "../constant/tabs";
import { setCookie, getCookie } from "../../../4_Shared/model/cookie";

const useThemeTab = () => {
  // 쿠키에서 초기 테마 값 불러오기
  const initialTheme = getCookie("theme") || TABS.WHITE;
  const [activeTab, setActiveTab] = useState(initialTheme);

  const handleTabWhite = () => setActiveTab(TABS.WHITE);
  const handleTabDark = () => setActiveTab(TABS.DARK);
  const isPresentTab = (selectTab) => activeTab === selectTab;

  useEffect(() => {
    setCookie("theme", activeTab); // 선택된 테마를 쿠키에 저장
    console.log(`테마 변경: ${activeTab}`); // 변경된 테마 로그 출력
  }, [activeTab]);

  return [handleTabWhite, handleTabDark, isPresentTab];
};

export default useThemeTab;
