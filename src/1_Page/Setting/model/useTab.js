import { useState } from "react";

const useTab = () => {
  const [activeTab, setActiveTab] = useState("화이트");
  const handleTabWhite = () => setActiveTab("화이트");
  const handleTabDark = () => setActiveTab("다크");
  const handleGetPresentTab = (selectTab) => activeTab === selectTab;
  return { activeTab, handleTabWhite, handleTabDark, handleGetPresentTab };
};
export default useTab;
